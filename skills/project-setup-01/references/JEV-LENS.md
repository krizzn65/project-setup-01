# Lensa Jev — video referensi panitia Track 3

Sumber: Latent Space, "Why I couldn't build Jev at OpenAI — Diogo Almeida, TypeSafe Co-founder & CEO" (youtu.be/cFx9Z3ZXca0, 2:22). Panitia Track 3 meminta semua peserta menyimak video ini, jadi juri kemungkinan menilai apakah tim memahami cara berpikirnya. File ini berisi pemahamannya dan cara menerapkannya ke context graph CS/Sales. Ini ringkasan dengan kata-kata sendiri, bukan transkrip.

## 1. Tesis inti

- **Di masa depan, AI paling banyak dipanggil oleh kode, bukan oleh manusia yang chatting.** Diogo bertanya: kalau AI memicu revolusi ekonomi, siapa yang memanggil API-nya? Jawabannya program, dengan selisih "banyak angka sembilan". Padahal hampir semua optimasi model diarahkan ke chat dengan manusia.
- **Jev** adalah "System One model" atau "large programmable model": cepat, murah, intuitif, dan tidak membuat rantai reasoning panjang. Model ini dirancang sebagai komponen yang dipanggil kode.
- **Metriknya *intelligence per dollar* dan *intelligence per second*.** Nama Jev diambil dari Jevons paradox: kalau kecerdasan makin murah, pemakaiannya justru meledak, termasuk untuk "dark data" yang dulu terlalu mahal untuk diproses.
- **Batasannya jujur.** Pertanyaan yang butuh banyak langkah logika (multi-hop) membuat kualitasnya turun, dan model ini tidak menghasilkan reasoning trace. Solusinya adalah memecah masalah, bukan memaksa satu panggilan besar.

## 2. Apa yang salah dengan model chat (RLHF) untuk developer

- RLHF untuk chat menghasilkan **mode collapse**: jawaban seragam, terlalu percaya diri, suka menjilat (sycophancy), dan gaya bahasa yang dioptimasi untuk menang di leaderboard.
- Yang dibutuhkan developer adalah **calibration**: kalau model bilang 70% yakin, jawabannya benar sekitar 70% dari waktu. Dengan begitu developer bisa memasang ambang (threshold) sendiri.
- **Kritik function calling:** tidak ada bias atau probabilitas per fungsi. Satu aplikasi butuh ambang "tolak" yang ketat, aplikasi lain butuh ambang longgar, dan satu-satunya kontrol sekarang adalah memohon di system message.
- **Penolakan (refusal) di API ibarat *type error*.** Aturan safety cocok untuk produk jadi, sedangkan API sebaiknya berperilaku seperti database yang bisa diprediksi.

## 3. Primitif: AI sebagai kontrol alur program

| Primitif | Dipetakan ke kode | Contoh di CS/Sales |
|---|---|---|
| **choice** (pilih satu dari enum) | `switch` | Jenis keputusan: diskon / eskalasi / renewal / churn-save |
| **boolean + probabilitas** (Bernoulli) | `if p > ambang` | "Kalimat ini berisi keputusan?" p = 0.91 |
| **score** | sort / threshold | Risiko churn akun 0–1, kemiripan dua keputusan |

Cara memakainya:
- **Input berupa state terstruktur (JSON), bukan template system message panjang.** Kirim objek akun, tiket, atau kutipan sebagai data.
- **Pecah jadi banyak pertanyaan kecil yang jalan paralel.** Tiap pertanyaan menjawab satu hal dan bisa dievaluasi sendiri.
- **Pakai threshold + eskalasi.** Confidence tinggi langsung diproses; ragu dinaikkan ke model yang lebih besar atau manusia; rendah dibuang. Diogo menyebutnya "ML without the ML": dapat manfaat classifier tanpa melatih classifier.
- **Cascade model:** model kecil dan murah dulu, model besar hanya untuk kasus sulit.

## 4. Filosofi kualitas

- **Bitterest lesson:** data dan *tugas yang tepat* lebih menentukan daripada compute. Pilih "north star task" yang benar-benar berguna.
- **Eval internal lebih penting daripada benchmark publik.** Ukur reliabilitas dalam "nines": 90%, 99%, 99,9%.
- **Robustness lebih penting dari determinism.** Jawaban harus stabil meski input diubah sedikit, misalnya dengan menambahkan nonce acak, mengubah urutan field, atau mengganti sinonim.
- **Tidak boleh ada perubahan model diam-diam.** Versi model dikunci, karena developer membangun di atasnya.
- **Jangan melatih model dengan data user tanpa izin.**

## 5. Coding agent dan "KV cache tyranny" (ide masa depan)

Agent sekarang terkunci di satu model, dan konteksnya hanya bisa terus ditambah. Akibatnya routing sulit, sub-agent kurang efektif, dan compaction (meringkas konteks) jadi masalah. Kalau kecerdasan murah, banyak hal jadi mungkin:
- Subtask diberi label dan disusun jadi pohon.
- Konteks yang relevan dicari dari pohon itu saat dibutuhkan.
- Riwayat dibaca ulang dengan murah. Menurut Diogo, "continuous learning" pada dasarnya masalah manajemen memori.
- Sub-agent bisa saling membaca state, dengan "lock" yang cerdas untuk koordinasi.

**Ini dekat dengan context graph.** Graph adalah memori terstruktur yang bisa dicari dan ditelusuri, bukan tumpukan teks yang terus bertambah.

## 6. Pandangan lain yang bisa muncul di Q&A

- Model chat tunggal untuk semua tugas tidak optimal. Lebih baik **banyak panggilan kecil yang tepat**, dengan model berbeda bila perlu.
- AI akan menghilang ke latar belakang perangkat lunak ("smart software"). Kenaikan produktivitas datang dari otomasi kecil yang andal dan berjumlah sangat banyak, bukan dari satu chatbot jenius.
- **Verify everything:** setiap pesan atau fakta diberi ID dan dicek. Ini cocok dengan provenance di graph.
- Visinya "AWS of intelligence": kecerdasan sebagai lapisan infrastruktur, seperti TCP.

## 7. Terjemahan ke context graph CS/Sales (yang wajib terlihat di docs)

1. **Pipeline ekstraksi = banyak primitif kecil, bukan satu prompt raksasa.** Per potongan teks, jalankan:
   - `is_decision` (boolean + p),
   - `decision_type` (choice),
   - `entity_match(a, b)` (boolean + p, untuk entity resolution),
   - `churn_risk` (score),
   - `precedent_similarity(d1, d2)` (score).
2. **Confidence disimpan di setiap edge dan node.** Ambang menentukan nasib datanya:
   - p ≥ ambang tinggi → ditulis ke graph,
   - p di zona ragu → masuk antrian review manusia,
   - p rendah → dibuang.
   
   Ini sama dengan alur "agent bertindak, manusia menyetujui", dan keputusan manusia ditulis balik sebagai `Decision`.
3. **Ambang bisa diatur per tim atau per tipe keputusan.** Contohnya, diskon > 20% selalu butuh approval. Ini menjawab kritik "pretty please" pada system prompt.
4. **Eval set kecil sendiri** (20–50 contoh berlabel dari seed data). Tampilkan akurasi per primitif dan contoh robustness (input diubah sedikit, hasil tetap). Angka ini bisa dipakai di pitch.
5. **Biaya dan latensi terlihat:** jumlah panggilan, token, dan ms per dokumen. Tunjukkan cascade: model kecil dulu, model besar hanya untuk kasus ragu.
6. **Versi model dan prompt dikunci** di config, lalu dicatat di provenance (`extracted_by: model@versi`).

## 8. Implementasi dengan LLM apa pun (tanpa harus memakai Jev)

Kalau panitia atau sponsor menyediakan akses Jev/TypeSafe, pakai dan ikuti dokumentasinya. Kalau tidak, pola yang sama bisa dibuat dengan LLM lain:
- **Structured output / JSON schema** untuk choice dan score (enum dan angka dibatasi skema).
- **Probabilitas:**
  - Pakai `logprobs` token jawaban kalau API menyediakannya.
  - Kalau tidak, ambil n sampel (mis. 5) dan pakai proporsi mayoritas sebagai p.
  - Confidence yang ditulis sendiri oleh model paling lemah; beri label `[kalibrasi belum diuji]`.
- **Panggilan paralel** (`Promise.all` / `asyncio.gather`) dengan batas konkurensi, plus cache hasil untuk demo.
- **Ambang di config**, bukan di prompt.

## 9. Kalimat siap pakai untuk pitch

- "Kami tidak meminta satu chatbot menebak semuanya. Kami memecah pekerjaan CSM jadi ratusan keputusan kecil yang bisa diukur, dan setiap keputusan punya confidence dan bukti."
- "Yang yakin langsung masuk ke graph. Yang ragu masuk ke manusia. Keputusan manusia ikut tersimpan, jadi sistemnya makin tahu kenapa sesuatu diputuskan."
- "Context graph adalah memori terstruktur untuk AI. Konteks tidak ditumpuk sebagai teks, tapi bisa dicari, ditelusuri, dan dibuktikan."
