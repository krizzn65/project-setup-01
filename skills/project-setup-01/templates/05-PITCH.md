# 05 — PITCH & Demo

> Kerangka dibuat saat setup, diisi final setelah feature freeze.

## 1. Alur Cerita ({{x}} menit)
| Menit | Bagian | Isi |
|---|---|---|
| 0:00 | Hook | {{cerita/angka dari study case yang membuat juri peduli}} |
| {{..}} | Masalah | {{kondisi "sebelum"}} |
| {{..}} | Solusi + kenapa context graph | {{...}} |
| {{..}} | Demo live | golden demo path (lihat §2) |
| {{..}} | Reliabilitas | {{angka eval set + ambang/eskalasi; kalimat jembatan ke video Jev}} |
| {{..}} | Dampak bisnis | {{metrik, ROI, model bisnis}} |
| {{..}} | Kenapa kami / langkah berikutnya | {{can't/won't, roadmap}} |

## 2. Script Demo
| # | Aksi di layar | Kalimat yang diucapkan |
|---|---|---|
| 1 | {{...}} | {{...}} |

**Tabel benchmark (wajib tampil):**
| | Akurasi | Biaya / pertanyaan | Latensi |
|---|---|---|---|
| Baseline (agent + grep/RAG) | {{...}} | {{...}} | {{...}} |
| Context graph + Jev | {{...}} | {{...}} | {{...}} |

Konteks publik (SalesTranscriptQA, judge berbeda): Hybrid RAG 87,5% overall / 63,3% multi-call; + reranker 96,3% / 81,3%. Sebutkan bahwa judge-nya berbeda.

**Cadangan:** video rekaman {{path/link}} · data/cache demo {{...}}

## 3. Outline Deck
1. {{Judul + tagline}}
2. {{Masalah (angka dari study case)}}
3. {{Solusi & arsitektur context graph (1 diagram)}}
4. {{Demo}}
5. {{Dampak & model bisnis}}
6. {{Kompetitor & pembeda}}
7. {{Tim & next steps}}

## 4. Pemetaan Kriteria Juri
| Kriteria | Bukti di pitch/demo |
|---|---|
| {{...}} | {{...}} |

## 5. Persiapan Q&A
| Pertanyaan juri | Jawaban (≤ 30 detik) | Penjawab |
|---|---|---|
| Kenapa graph, bukan RAG/CRM biasa? | {{...}} | {{...}} |
| Datanya dari mana? Sintetis? | {{...}} | {{...}} |
| Apa bedanya context graph dengan knowledge graph biasa? | {{jejak keputusan + preseden + masa berlaku, bukan cuma relasi entitas}} | {{...}} |
| Bagaimana kalau ekstraksi LLM salah / entitas tertukar? | {{provenance + confidence, approval manusia, kutipan sumber bisa dicek}} | {{...}} |
| Kenapa user harus percaya rekomendasi agent? | {{setiap jawaban punya jalur bukti + preseden; manusia tetap yang memutuskan}} | {{...}} |
| Bagaimana kalau dipakai di data nyata skala besar? | {{...}} | {{...}} |
| Siapa yang bayar, berapa? | {{...}} | {{...}} |
| Apa bedanya dengan Salesforce/Gainsight? | {{...}} | {{...}} |
| Privasi & keamanan data pelanggan? | {{...}} | {{...}} |
| Apa hubungannya dengan ide Jev (video panitia)? | {{AI dipanggil kode sebagai primitif kecil + confidence + ambang; graph = memori terstruktur}} | {{...}} |
| Kenapa tidak satu model besar / chatbot saja? | {{banyak keputusan kecil lebih murah, cepat, dan bisa diukur; model besar hanya untuk kasus ragu}} | {{...}} |
| Seberapa akurat, dan bagaimana kalian tahu? | {{angka eval set per primitif + uji robustness}} | {{...}} |

## 6. Kartu Contekan Bisnis
> Untuk dibaca ulang sebelum pitch. Bahasa awam, tanpa jargon.

**Ide kita dalam 3 kalimat (versi jelaskan ke teman):**
{{Siapa yang repot → kenapa repot → bagaimana aplikasi kita membantu.}}

**Kenapa pakai context graph (versi awam):**
{{Analogi sederhana, mis. "seperti peta hubungan antar pelanggan, tiket, dan deal, jadi AI bisa menelusuri sebab-akibat, bukan cuma mencari kata kunci".}}

**Angka kunci:**
| Angka | Nilai | Sumber | Cara menghitung (kalau ditanya) |
|---|---|---|---|
| {{ROI pelanggan}} | {{...}} | {{study case / asumsi / riset}} | {{...}} |
| {{Harga}} | {{...}} | {{...}} | {{...}} |

**Kalau juri tanya hal yang tidak kamu tahu:** "Itu asumsi kami berdasarkan {{...}}; langkah berikutnya adalah memvalidasinya dengan {{...}}." Jujur lebih baik daripada mengarang.

**Kamus istilah:**
| Istilah | Artinya |
|---|---|
| Churn | Pelanggan berhenti berlangganan |
| ARR | Pendapatan langganan per tahun |
| NRR | Pendapatan dari pelanggan lama tahun ini dibanding tahun lalu (termasuk upgrade & churn); >100% berarti tumbuh |
| Upsell / expansion | Pelanggan lama membeli lebih banyak |
| CSM | Customer Success Manager — orang yang menjaga pelanggan tetap puas & tidak churn |
| AE | Account Executive — sales yang menutup deal |
| Pipeline | Daftar calon deal yang sedang berjalan |
| Win rate | Persentase deal yang berhasil ditutup |
| ROI | Uang yang didapat/dihemat dibanding biaya |
| GTM | Go-to-market — cara produk sampai ke pembeli |
| Context graph | Peta hubungan data bisnis + catatan kenapa tiap keputusan diambil |
| Jejak keputusan (decision trace) | Catatan siapa memutuskan apa, kenapa, berdasarkan bukti apa |
| Preseden | Kasus serupa di masa lalu yang bisa jadi acuan keputusan sekarang |
| RAG | Cara AI mencari potongan dokumen yang mirip lalu menjawab; tidak menelusuri hubungan |
| Entity resolution | Mengenali bahwa beberapa nama berbeda adalah pihak yang sama |
| Confidence / kalibrasi | Seberapa yakin AI; terkalibrasi berarti "70% yakin" memang benar ±70% dari waktu |
| Ambang (threshold) | Batas yakin minimal sebelum hasil AI dipakai otomatis; di bawahnya dicek manusia |
| Eval set | Kumpulan contoh dengan jawaban benar, dipakai untuk mengukur akurasi AI |
| Primitif AI | Pertanyaan kecil ke AI dengan jawaban pasti: pilih satu, ya/tidak + yakin berapa, atau skor |
| {{istilah lain dari study case}} | {{...}} |
