# 03 — ARCHITECTURE & Rencana Build

> Turunan dari 01-PRD. Prioritas: golden demo path jalan stabil. ID task = ID di 04-TODO.

## 1. Stack
| Lapisan | Pilihan | Alasan (dikuasai tim / wajib sponsor / tercepat) |
|---|---|---|
| Bahasa & framework | {{...}} | {{...}} |
| Graph store | {{...}} | {{...}} |
| LLM / embedding | {{...}} | {{...}} |
| UI & visualisasi graph/data | {{...}} | {{...}} |
| Ikon | {{Lucide / Phosphor — bukan emoji}} | {{...}} |
| Hosting demo | {{...}} | {{...}} |

## 2. Perintah Verifikasi
| Cek | Perintah |
|---|---|
| Dev | `{{...}}` |
| Seed data | `{{...}}` |
| Test | `{{...}}` |
| Build | `{{...}}` |
| Typecheck | `{{...}}` |
| Lint | `{{...}}` |
| Dead code | `{{mis. npx knip (JS/TS), vulture (Python)}}` |
| Eval AI | `{{mis. python eval/run.py → akurasi per primitif}}` |
| Golden demo path | {{langkah manual / script e2e}} |

## 3. Skema Context Graph
**Node**
| Label | Properti kunci | Sumber data |
|---|---|---|
| Account | {{id, nama, ARR, tier, renewal_date}} | {{...}} |
| {{Contact / Deal / Ticket / Conversation / UsageEvent / Feature}} | {{...}} | {{...}} |
| Decision | {{id, tipe (diskon/eskalasi/renewal/…), keputusan, alasan, dibuat_oleh, waktu, hasil}} | {{ekstraksi teks / approval di app}} |
| Policy / Exception | {{aturan yang dirujuk atau dikecualikan}} | {{...}} |

**Edge**
| Relasi | Dari → Ke | Properti |
|---|---|---|
| {{HAS_CONTACT}} | {{Account → Contact}} | `valid_from`, `valid_to`, `source`, `confidence` |
| BASED_ON | Decision → {{node bukti}} | `source` |
| DECIDED_BY / APPROVED_BY | Decision → Contact/User | waktu |
| ABOUT | Decision → Account/Deal | — |
| SIMILAR_TO / PRECEDENT | Decision → Decision | skor kemiripan |

**Masa berlaku:** setiap fakta yang bisa berubah memakai `valid_from`/`valid_to`; query bisa menjawab kondisi pada waktu tertentu.

**Provenance:** setiap node/edge hasil ekstraksi menyimpan `source` (dokumen + kutipan) dan `confidence`, supaya jalur bukti bisa ditampilkan.

## 4. Pipeline Data
1. **Ingest** teks mentah ({{email / transkrip / tiket / catatan}}) dan data terstruktur ({{CSV/CRM}}).
2. **Ekstraksi** oleh LLM → JSON dengan skema tetap: entitas, relasi, keputusan + kutipan sumber.
3. **Penyatuan entitas:** normalisasi nama + domain email → LLM sebagai penentu untuk kasus ragu → merge ke node yang sama. Contoh kasus di seed: {{"PT ABC" / "ABC Corp" / "abc.co.id"}}.
4. **Tulis ke graph** dengan provenance + masa berlaku.
**Cadangan:** seed data versi bersih yang langsung dimuat kalau ekstraksi bermasalah saat demo.

## 4b. Peta Panggilan AI (lensa Jev)
> LLM dipanggil oleh kode sebagai primitif kecil yang terkalibrasi, bukan satu prompt raksasa. Pola: `docs/JEV-LENS.md` §7–8.

| Titik keputusan | Primitif | Input (JSON) | Output | Ambang: tulis / review / buang | Eskalasi |
|---|---|---|---|---|---|
| {{Kalimat berisi keputusan?}} | boolean + p | {{`{text, source_id}`}} | {{`{is_decision, p}`}} | {{≥0.85 / 0.5–0.85 / <0.5}} | {{model besar → manusia}} |
| {{Tipe keputusan}} | choice | {{...}} | {{enum: diskon/eskalasi/renewal/…}} | {{...}} | {{...}} |
| {{Dua entitas sama?}} | boolean + p | {{`{a, b}`}} | {{`{same, p}`}} | {{...}} | {{...}} |
| {{Risiko churn / kemiripan preseden}} | score | {{...}} | {{0–1}} | {{...}} | {{...}} |

- **Sumber probabilitas:** {{logprobs / mayoritas n sampel / self-report [kalibrasi belum diuji]}}
- **Paralel & cache:** {{batas konkurensi; cache hasil untuk demo}}
- **Ambang disimpan di:** {{file config / tabel pengaturan per tim}} — bukan di prompt
- **Versi dikunci:** model `{{nama@versi}}`, prompt `{{v1}}`; dicatat di provenance (`extracted_by`)
- **Eval set:** {{n}} contoh berlabel di `{{path}}`; target akurasi per primitif {{...}}; uji robustness: {{input diubah sedikit (urutan field, sinonim, nonce) → hasil sama}}
- **Biaya & latensi:** {{panggilan, token, ms per dokumen; cascade model kecil → besar}}

## 5. Alur Sistem
{{Pertanyaan user → traversal graph + pencarian preseden → LLM menyusun jawaban + jalur bukti + usulan aksi dengan confidence (di bawah ambang → antrian review) → user approve/tolak/ubah → keputusan ditulis balik sebagai Decision. Diagram mermaid boleh.}}

**Contoh query inti (multi-hop):** {{query yang menjadi bukti "kenapa graph"}}
**Contoh query preseden:** {{"keputusan serupa untuk akun dengan kondisi mirip, siapa yang memutuskan, hasilnya apa"}}
**Mode pembanding RAG:** {{pertanyaan yang sama dijawab dengan vector search biasa atas dokumen yang sama, ditampilkan berdampingan}}

## 6. Data
- **Sumber:** {{dataset panitia / seed sintetis}}
- **Seed sintetis:** {{jumlah entitas, skenario yang ditanam agar demo bercerita}} — berisi teks mentah, nama entitas yang tidak konsisten, dan beberapa keputusan masa lalu (untuk preseden). Disebut terbuka sebagai data sintetis saat pitch.

## 7. Rencana Build
Task 30–120 menit, punya pemilik & jam target.
| ID | Task | Pemilik | Target jam | Fitur | Kriteria selesai |
|---|---|---|---|---|---|
| T1 | {{Repo + seed data + graph termuat}} | {{...}} | {{...}} | — | {{query contoh mengembalikan hasil}} |

**Feature freeze:** {{jam}}

## 8. Risiko & Cadangan
| Risiko | Cadangan |
|---|---|
| LLM/API lambat atau down saat demo | {{cache jawaban demo / video cadangan}} |
| Ekstraksi/penyatuan entitas tidak akurat | {{seed data bersih + validasi skema JSON + ambang review}} |
| Model/provider berubah perilaku di tengah lomba | {{versi dikunci + eval set dijalankan ulang sebelum demo}} |
| {{...}} | {{...}} |

## 9. Q&A Keputusan
| # | Pertanyaan | Keputusan | Jam |
|---|---|---|---|
| Q1 | {{...}} | {{...}} | {{...}} |
