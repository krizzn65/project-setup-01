# Jev Kit — API, pola, dan benchmark untuk hari H

Sumber: link yang dibagikan mentor Track 3 (Kyle Wild, Endgame Labs, GitHub `dorkitude`) setelah TM 9 Okt 2026. Semua dibaca langsung dari repo/paper pada 9 Okt 2026.
- API dari kode klien Jev di `dorkitude/webctl` (MIT, "feel free to steal the code").
- Benchmark dari `Endgame-Labs/SalesTranscriptQA`, `dorkitude/enronqa-cli`, dan paper arXiv 2505.18878 (CRMArena-Pro) serta 2505.00263 (EnronQA).

Tetap cocokkan dengan quickstart resmi di typesafe.ai saat hari H, karena API bisa berubah.

## 1. Jev API (dari kode webctl)

```
POST https://api.typesafe.ai/v1/systemone
Authorization: Bearer $JEV_API_KEY
Content-Type: application/json
```

Request:
```json
{
  "model": "jev-latest",
  "state": { "query": "...", "results": [{ "id": "result_0", "title": "...", "snippet": "..." }] },
  "questions": {
    "relevance": {
      "type": "score",
      "instructions": "Score the result with id \"result_0\" ...",
      "criteria": ["Off-topic: ...", "Low value: ...", "Useful: ...", "Best available: ..."]
    },
    "is_greeting": { "type": "noul", "instructions": "Is the text a greeting?" }
  }
}
```

- `state` = JSON bebas (dokumen, konteks, daftar item ber-id). Kirim yang kecil; batasnya sekitar 32k token.
- `questions` = map `nama → pertanyaan`. Satu request boleh berisi banyak pertanyaan (batch).
- **`score`**: `criteria` adalah level berurutan **dari terendah (indeks 0) ke tertinggi**. Ini yang dipakai juga untuk "choice" bertingkat.
- **`noul`**: pertanyaan ya/tidak. Jawabannya P(ya). Ini yang di TM terdengar seperti "dual".

Response:
```json
{
  "model": "jev-latest",
  "answers": {
    "relevance": { "type": "score", "score": 2.31, "confidence": 0.82,
                   "legend": {"0": "Off-topic: ...", "3": "Best available: ..."},
                   "probabilities": {"0": 0.02, "1": 0.09, "2": 0.45, "3": 0.44} },
    "is_greeting": { "type": "noul", "noul": 0.97 }
  },
  "usage": { "input_tokens": 812, "output_tokens": 6 }
}
```

- `score` = level harapan berbobot probabilitas, dalam rentang [0, jumlah_criteria−1].
- `confidence` = confidence terkalibrasi [0, 1].
- `probabilities` per level. Level paling mungkin = argmax.
- `noul` = P(ya). Webctl memakai ya bila ≥ 0.5, dan confidence = |P − 0.5| × 2.
- `usage` dipakai untuk mencatat biaya per pertanyaan di benchmark.
- **Error:** 401/403 = key salah. 429/5xx/jaringan = coba ulang dengan backoff (webctl: 3 percobaan, 0,5 s lalu dikali 2). Timeout 60 s.

**Health-check** (sama dengan `Validate` di webctl): `state {"text":"hello world"}` + noul `"Is the text a greeting?"`.

### Klien minimal (Python stdlib, tanpa dependency)

```python
import json, os, time, urllib.request, urllib.error

JEV_URL = "https://api.typesafe.ai/v1/systemone"

def jev(state, questions, model="jev-latest", attempts=3):
    body = json.dumps({"model": model, "state": state, "questions": questions}).encode()
    req = urllib.request.Request(JEV_URL, body, {
        "Authorization": f"Bearer {os.environ['JEV_API_KEY']}",
        "Content-Type": "application/json"})
    for i in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)  # {"answers": {...}, "usage": {...}}
        except urllib.error.HTTPError as e:
            if e.code != 429 and e.code < 500 or i == attempts - 1:
                raise
        except urllib.error.URLError:
            if i == attempts - 1:
                raise
        time.sleep(0.5 * 2 ** i)

def score(instructions, criteria):
    return {"type": "score", "instructions": instructions, "criteria": criteria}

def noul(instructions):
    return {"type": "noul", "instructions": instructions}
```

Untuk TypeScript/JS bentuk JSON-nya sama: `fetch` + validasi respons dengan Zod.

## 2. Pola dari webctl (siap ditiru)

- **Prompt = file berisi frontmatter** (`type`, `model`, `criteria`) + template instruksi. Rubrik bisa diubah tanpa menyentuh kode.
- **Batch:** satu request berisi state berupa daftar item ber-id (`result_0`, `result_1`, …), dengan satu pertanyaan per item ("score the result with id X, judge only that one"). Lebih murah dan cepat daripada satu request per item.
- **Per-item paralel:** kalau tidak batch, batasi konkurensi (webctl: 8).
- **Ambang:** skor diskalakan ke 0–10 (`score / max_level × 10`). Ambang default = 1,2 level di bawah puncak. Untuk 4 level, ambangnya 6,0 ("Useful" ke atas). Ada juga opsi `--min-results` sebagai backfill supaya hasil tidak kosong.
- **Rubrik bertingkat dengan deskripsi konkret per level** (bukan "1–10" polos). Setiap level menjelaskan kapan dipakai, termasuk kasus khusus.
- **Dedupe 2 tahap:** cara murah (normalisasi, MinHash) mengusulkan kandidat, lalu Jev noul "apakah keduanya konten yang sama?" mengonfirmasi. Ini pola **entity resolution** yang bisa langsung dipakai: normalisasi nama/domain → kandidat → Jev noul "entitas sama?".
- **Chunk filter:** dokumen panjang dipotong (2000 karakter, overlap 20%), lalu Jev menilai relevansi tiap chunk dan hanya chunk relevan yang masuk konteks agent.
- **Benchmark yang dipublikasikan:** per kasus × per arm dicatat jawaban, token, biaya, waktu, dan skor kualitas. Ringkasan disajikan sebagai tabel (payload token, total token, detik, biaya/kasus, kualitas, bersumber). Mentor menyajikan hasil dengan cara ini; tiru formatnya di pitch.

### Tiga diagram webctl → pipeline context graph CS/Sales

Struktur yang sama dipakai untuk data sales. Webctl memfilter di read time; kita memakainya di **write time** (saat data masuk) dan di **query time**.

```
1. KOMPILASI (write time) — mirip "filter chunks"
   transkrip call / email
        │  potong per giliran bicara atau ±2000 karakter (overlap 20%)
        ▼
   Jev, 1 batch request per dokumen, banyak pertanyaan per chunk:
     noul  "chunk ini berisi keputusan / komitmen / keberatan?"
     score "tipe: harga · fitur · jadwal · kompetitor · risiko churn" (criteria bertingkat)
     score "seberapa penting untuk deal ini?" (0–3)
        │  ✂ chunk tak relevan tidak disimpan
        ▼
   node Decision / Objection / Commitment + kutipan + call_id + confidence → graph

2. PENYATUAN ENTITAS — mirip "deduplicate"
   nama perusahaan/kontak dari banyak call
        │  tahap 1 (gratis): normalisasi nama + domain email → yang identik digabung
        ▼
   tahap 2 (murah): kemiripan string/MinHash → beberapa pasangan kandidat
        ▼
   Jev 1 batch: noul "apakah A dan B entitas yang sama?" per pasangan
        │  ya ≥ ambang → merge (alias disimpan) · ragu → antrian review · tidak → tetap terpisah
        ▼
   satu node Account/Contact, terhubung ke semua call & opportunity

3. MENJAWAB (query time) — mirip "filter search results"
   pertanyaan user → traversal graph (account → opportunity → semua call terkait)
        ▼
   kandidat chunk dari graph (bukan dari seluruh corpus)
        ▼
   Jev batch: score "chunk ini membantu menjawab pertanyaan?" → ambil di atas ambang
        ▼
   3–6 chunk + jalur bukti → LLM generatif menyusun jawaban
```

Yang dibuktikan di benchmark: jalur 3 menemukan **kedua** call untuk pertanyaan multi-call, karena graph sudah menautkannya lewat opportunity di jalur 1–2. RAG biasa harus menebak dari kemiripan teks saja.

## 3. Benchmark CS/Sales: SalesTranscriptQA (utama)

Dataset buatan mentor sendiri, dari transkrip call sales CRMArena-Pro (Salesforce, sintetis).
- **Isi:** 10.829 transkrip verbatim + 2.962 pasangan QA yang sudah direview.
  - B2B single-call: 1.215 pertanyaan.
  - **B2B multi-call: 428 pertanyaan.** Butuh bukti dari **tepat dua call dalam satu opportunity**.
  - B2C single-call: 1.319 pertanyaan.
  
  Metadata (account, contact, lead, opportunity, timestamp) terpisah dari dialog.
- **Lisensi:** data **CC BY-NC 4.0**. Boleh untuk hackathon, sebutkan atribusi Salesforce + Endgame Labs. CLI-nya MIT.
- **CLI:**
  ```sh
  uv tool install git+https://github.com/Endgame-Labs/SalesTranscriptQA.git
  salestranscriptqa fetch --repo EndgameLabs/SalesTranscriptQA --revision 183bd79178a3555351d25400225001a9b27ecc2f --data-dir salestranscriptqa-data
  salestranscriptqa documents export --domain b2b --output calls.jsonl
  salestranscriptqa questions export --domain b2b --question-class multi_call --output multicall.jsonl
  salestranscriptqa validate answers.jsonl --domain b2b
  salestranscriptqa score answers.jsonl --domain b2b --judgments judgments.jsonl --output scores.json
  ```
- **Format jawaban (JSONL):** `{"question_id": "...", "answer": "...", "retrieved_call_ids": ["CALL_1", "CALL_2"]}`.
- **Penilaian dengan Jev** (arahan mentor: bukan LLM-as-judge):
  1. `salestranscriptqa judge-input answers.jsonl --domain b2b` menghasilkan paket berisi pertanyaan, jawaban, referensi, dan sumber.
  2. Jev noul "apakah jawaban ini benar menurut referensi?" untuk tiap paket.
  3. Tulis `{"question_id", "correct": P ≥ ambang}` ke `judgments.jsonl`.
  4. `score --judgments` menghitung akurasinya.
- **Aturan:** index **seluruh** corpus domain. Membatasi retrieval ke call sumber = membocorkan label.
- **Baseline yang dipublikasikan** (answerer GLM 5.3 Flash; judge Qwen):

  | Konfigurasi | Overall | Single-call | Multi-call |
  |---|---:|---:|---:|
  | Hybrid RAG (dense + BM25, RRF) | 87,5% | 91,6% | **63,3%** |
  | Hybrid + reranker | 96,3% | 98,8% | **81,3%** |
  | Oracle (call sumber lengkap) | 99,9% | 99,9% | 100% |

- **Peluang context graph:** pertanyaan **multi-call** adalah titik lemah RAG (63–81%). Context graph yang menghubungkan call lewat `opportunity`/`account` di write time bisa langsung mengambil kedua call yang relevan. **Jadikan B2B multi-call sebagai benchmark utama dan momen "wow".**
- Jangan klaim mengalahkan baseline kalau judge-nya berbeda tanpa menyebutkannya. Bandingkan dengan baseline yang kalian jalankan sendiri pada subset yang sama dan judge yang sama (Jev), lalu kutip angka di atas sebagai konteks.

## 4. Alternatif: EnronQA

- 103.638 email, 528.304 QA, 150 inbox (paper). Revisi yang dipin di CLI berisi 73.772 email unik, dan split test berisi 89.316 pertanyaan. Satu pertanyaan → satu email sumber.
- CLI `enronqa` (MIT): `fetch` (beberapa GB), `documents export`, `questions export --set test --limit 100 --seed 42`, `validate`, `judge-input`, `score`. Ada juga `import-dataset` untuk korpus sendiri.
- **Lisensi:** dataset tidak mencantumkan lisensi formal (korpus CMU untuk riset). Aman untuk hackathon riset, tapi jangan didistribusikan ulang. Kurang dekat dengan CS/Sales; pakai bila ide berbasis email/inbox.

## 5. CRMArena-Pro (konteks, untuk pitch)

Benchmark agent CRM dari Salesforce: 19 tugas tervalidasi ahli di sales, service, dan CPQ, untuk B2B dan B2C. Agent LLM terbaik hanya **±58% sukses single-turn dan ±35% multi-turn**, dengan kesadaran kerahasiaan hampir nol. Angka ini bisa dipakai di slide "masalah": agent CRM masih gagal, konteksnya berantakan.
