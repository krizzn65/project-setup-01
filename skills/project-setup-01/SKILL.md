---
name: project-setup-01
description: Generator dokumentasi kilat untuk hari H hackathon track "Context Graphs in Customer Success and Sales" (build dari nol). Satu putaran pertanyaan (study case, pakai ide finalis atau tidak, stack, referensi desain) + pertanyaan bisnis singkat berbasis study case, lalu AI menyusun SEMUA docs sekaligus — 00-BRIEF, 01-PRD (dengan Startup Canvas strategi + bisnis yang kritis), 02-AGENT, 03-ARCHITECTURE, 04-TODO, 05-PITCH, 06-WORKFLOW, 07-RULES, 08-DESIGN — plus CLAUDE.md/AGENTS.md, satu kali ACC, opsional 3 konsep logo (skill logo-design), lalu menawarkan bantuan setup projek (install backend, frontend, database, tooling). Berhenti sebelum mengerjakan fitur. Pakai saat user bilang "hackathon", "lomba", "study case", "project-setup-01", "/project-setup-01".
---

# Project Setup 01 — Docs Kilat Hackathon: Context Graphs in CS & Sales

**Tujuan satu-satunya:** menghasilkan dokumentasi lengkap secepat mungkin supaya tim bisa langsung build. Skill ini **tidak** mengatur jadwal, tidak memantau progres, dan tidak menyela saat build.

Target: dari jawaban user sampai docs selesai **±15–20 menit**.

## Prinsip

- **Berlaku untuk AI apa pun.** Ikuti juga `../always-on/SKILL.md` bila ada (aturan kode, UI, output perintah, gaya chat). Path `../<nama>/` berarti folder skill bernama itu yang berdampingan dengan folder ini. AI tanpa akses terminal melewati hanya langkah yang butuh shell (lint/export desain, script ekstraksi, setup projek) dan menyebutkannya.
- **Pertanyaan seminimal mungkin, satu kali ACC.** Satu putaran pertanyaan dasar + (jika perlu) satu putaran pertanyaan bisnis berbasis study case. Jangan tanya per dokumen, jangan tanya per fase.
- **User bukan orang bisnis.** AI menyusun seluruh strategi & model bisnis sendiri, dalam bahasa awam (istilah dijelaskan di kurung).
- **Kritis tetap jalan, tapi di dalam kepala AI:** sebelum menulis, AI menguji drafnya sendiri (kontradiksi, klaim tanpa angka, segmen terlalu luas, graph cuma tempelan) lalu memperbaikinya. Yang tersisa dan butuh keputusan user masuk ke ringkasan akhir.
- **Angka diberi label sumber:** `[study case]`, `[asumsi]`, `[riset: link]`. Asumsi disertai cara menghitungnya.
- **Jangan berasumsi soal definisi "context graph", aturan lomba, atau tools sponsor** — ikuti study case/brief. Kalau ada yang ambigu, catat di 00-BRIEF sebagai "tanya panitia" dan pilih asumsi paling aman, lalu lanjut (jangan berhenti menunggu).
- **Build dari nol:** semua docs & kode dibuat saat lomba. Ide finalis dipakai sebagai teks masukan, bukan kode. Framework, library publik, dan scaffold resmi boleh kecuali panitia melarang.

## Bekal domain (verifikasi dengan study case)

- **Context graph:** graf yang menyatukan entitas bisnis (akun, kontak, deal, tiket, percakapan/email/call, pemakaian produk, kontrak, renewal) beserta relasi, waktu, dan sumbernya, plus **jejak keputusan** (siapa memutuskan apa, kenapa, berdasarkan konteks apa). Memberi AI agent konteks yang bisa ditelusuri dan dijelaskan, bukan sekadar potongan teks hasil pencarian vektor.
- **Jejak keputusan = pembeda utama, bukan pelengkap.** CRM menyimpan *apa* (status deal, diskon 20%); context graph juga menyimpan *kenapa* (diskon diberi karena akun strategis + kompetitor menawar lebih murah, disetujui VP Sales, mengacu ke kasus serupa). Jadikan `Decision` node sendiri yang terhubung ke bukti, pembuat keputusan, kebijakan/pengecualian, dan hasilnya. Ini memungkinkan **pencarian preseden**: "kasus serupa sebelumnya diputuskan bagaimana, dan hasilnya apa?"
- **Fakta punya masa berlaku:** relasi dan properti diberi `valid_from`/`valid_to` (mis. champion pindah perusahaan, paket berubah). Query menjawab "kondisi saat itu", bukan hanya "kondisi sekarang".
- **Data CS/Sales kebanyakan teks tak terstruktur** (email, transkrip call, tiket, catatan meeting). Wajib ada:
  1. **Ekstraksi** entitas + relasi + keputusan dari teks oleh LLM dengan skema output tetap (JSON), menyimpan kutipan sumber sebagai bukti.
  2. **Penyatuan entitas** (entity resolution): "PT ABC", "ABC Corp", "abc.co.id" = satu node. Cara paling cepat untuk hackathon: normalisasi nama + domain email, lalu LLM sebagai penentu untuk kasus ragu.
  Ini risiko teknis terbesar; jadikan task awal dan siapkan seed data yang sudah bersih sebagai cadangan.
- **Agent yang bertindak, manusia yang menyetujui:** agent tidak hanya menjawab, tapi mengusulkan aksi (draf email, task untuk CSM, eskalasi, rekomendasi diskon) lengkap dengan jalur bukti. Manusia menyetujui/menolak/mengubah, dan **keputusan itu ditulis kembali ke graph** sebagai `Decision` baru. Graph makin pintar setiap dipakai — cerita kuat untuk juri.
- **Pertanyaan juri yang hampir pasti:** "Kenapa graph, bukan RAG/CRM/dashboard biasa?" Jawaban harus menunjukkan hal yang **hanya** bisa lewat traversal relasi (multi-hop, mis. tiket → fitur → akun lain yang memakai fitur itu → renewal berisiko), pencarian preseden keputusan, atau explainability (jalur bukti). **Buktikan di demo**: pertanyaan yang sama dijawab RAG biasa vs context graph berdampingan.
- **Persona:** CSM, VP CS, AE, SDR/BDR, Sales manager, RevOps, Support, Account manager.
- **Metrik:** NRR, GRR, churn, expansion, health score, time-to-value, renewal rate, win rate, sales cycle, pipeline coverage, forecast accuracy, resolution time, CSAT/NPS, jam kerja manual yang dihemat.
- **Kompetitor:** Salesforce (Einstein/Agentforce), HubSpot, Gainsight, ChurnZero, Totango, Gong, Clari, Outreach, Glean, Zendesk/Intercom AI.

## Standar UI: anti tampilan buatan AI

Aplikasi yang dibangun cepat dengan AI sering terlihat "buatan AI". Standar ini melengkapi Prinsip UX 1–9 di `../project-design/SKILL.md` (tidak mengulanginya) dan dipakai di PRD (daftar layar), arsitektur (stack), TODO, 08-DESIGN, rules, dan setup.

- **A1. Tanpa emoji sebagai ikon UI.** Satu library ikon (mis. Lucide atau Phosphor), satu gaya.
- **A2. Jangan pakai warna bawaan AI** (terang, jenuh, tidak serasi). Pakai palet kalem dari 08-DESIGN; warna masuk lewat data dan konten (status, skor, tipe node, grafik), bukan lewat tombol dan ikon dekoratif.
- **A3. Satu layar, satu tugas.** Setiap layar hanya menampilkan yang relevan dengan tugasnya; elemen yang sama (mis. baris ringkasan) tidak diulang di banyak layar.
- **A4. Navigasi fokus.** Hanya menu yang relevan dengan tugas user; link sekunder (pengaturan, akun) disimpan di popover. Ganti avatar bulat bergradasi berisi huruf dengan kartu akun sederhana.
- **A5. Elemen ramai dirapikan.** Aksi sekunder masuk menu ⋯, chip panjang jadi ikon + tooltip, angka/metrik rata kanan. Ukuran mengikuti yang dipedulikan user (skor risiko, nilai deal besar; ID, label teknis kecil) — penerapan Prinsip UX 3.
- **A6. Hapus elemen tanpa fungsi** (kartu, tombol, badge yang tidak melakukan apa-apa).
- **A7. Wadah sesuai isi.** Isian sedikit di ruang besar → modal, bukan panel samping yang kosong; opsi lanjutan dilipat secara default; konten yang terus bertambah dipisah dengan tab.
- **A8. Data yang kaya dan bisa dibandingkan.** Sediakan cara membandingkan item satu per satu (mis. toggle per akun), dan pilih visual yang paling menjelaskan data (graph, timeline, peta) dibanding grafik batang generik.
- **A9. Fitur kecil bernilai besar** (murah dibuat, jelas berguna) dicatat di 04-TODO setelah golden demo path, prioritas Could.

## Langkah 1 — Satu putaran pertanyaan

Tanyakan sekaligus (pakai alat pertanyaan pilihan bila AI ini punya, mis. `AskUserQuestion`; kalau tidak, tulis pilihannya bernomor di chat; teks ditempel di chat):

1. **Tempel study case lengkap** (beserta kriteria juri, deliverable, data/tools wajib, deadline — kalau ada di brief).
2. **Pakai ide finalis?** Pakai penuh / Integrasikan dengan study case / Ide baru / Biar AI yang menilai. Kalau dipakai → tempel teks idenya.
3. **Stack & tim:** bahasa/framework yang paling dikuasai tim (atau "terserah AI"), dan anggota tim + skill (opsional).
4. **Referensi desain:** URL/screenshot/Figma, atau "terserah AI".

Default kalau tidak disebut: deadline 09.00 esok hari; mode light; owner task "—".

## Langkah 1b — Pertanyaan bisnis (boleh, maksimal satu putaran)

Setelah membaca study case, AI boleh menanyakan **3–5 pertanyaan bisnis** kalau jawabannya benar-benar mengubah isi docs. Syarat:
- **Setiap pertanyaan berpijak pada study case**: kutip/merujuk bagian study case yang memicunya, mis. *"Di study case disebut 'tim CS kewalahan menangani 200 akun'. Menurutmu yang paling sakit itu CSM-nya atau manajernya?"*
- Bahasa awam, tanpa jargon (atau dijelaskan di kurung).
- Setiap pertanyaan punya **rekomendasi jawaban + alasan singkat**, supaya user bisa jawab "ikut rekomendasi" atau "nggak tahu".
- Jangan tanya hal yang bisa disimpulkan sendiri dari study case atau bekal domain. Jangan tanya hal di luar study case.
- "Nggak tahu" → pakai rekomendasi, beri label `[asumsi]` di docs.

## Langkah 2 — AI menyusun semua docs sekaligus

Kerjakan tanpa bertanya lagi, berurutan:

1. **`docs/00-BRIEF.md`** (`templates/00-BRIEF.md`) — study case **verbatim**, ringkasan, kriteria juri, keputusan ide, hal yang perlu ditanyakan ke panitia.
2. **Keputusan ide** (kalau user pilih "biar AI menilai" atau "integrasi") — nilai kecocokan ide finalis vs study case (relevansi, graph esensial, kriteria juri, bisa didemokan, nilai bisnis); putuskan Pakai / Integrasi / Pivot. Saat aturan panitia belum jelas, utamakan **Integrasi** (inti ide lama dibingkai sebagai solusi study case).
3. **`docs/01-PRD.md`** (`templates/01-PRD.md`) — Startup Canvas lengkap:
   - Strategi: vision, SATU segmen utama + pekerjaan yang ingin diselesaikan, value proposition (sebelum → bagaimana → sesudah, dengan angka), **kenapa context graph**, alternatif & pembeda, biaya rendah vs nilai unik, trade-off, metrik (North Star + yang dibuktikan di demo), cara mendapat pengguna (pembeli vs pengguna), bangun sendiri vs partner, kenapa kompetitor besar tidak bisa/mau meniru.
   - Bisnis: struktur biaya, pricing + contoh angka, ROI pelanggan.
   - Validasi: cek koherensi, 3 hipotesis berisiko + cara demo membuktikannya.
   - **Golden demo path** 3–6 langkah + momen "wow". Hanya fitur di jalur ini yang Must; fitur yang tidak melayani kriteria juri = di luar scope. Kerangka yang disarankan (sesuaikan dengan study case):
     1. Data mentah (email/tiket/call) → graph terbentuk (tunjukkan sekilas).
     2. Pertanyaan bisnis dari study case → agent menjawab + **jalur bukti** di graph.
     3. **Pembanding:** pertanyaan sama dijawab RAG biasa → gagal/tanpa bukti.
     4. Agent mengusulkan aksi + preseden keputusan serupa → user menyetujui.
     5. Keputusan tersimpan di graph → pertanyaan berikutnya memakai keputusan itu.
   - **Daftar layar** (Standar UI A3–A4): setiap layar di golden demo path punya satu tugas, informasi yang ditampilkan (yang penting vs pendukung), aksi utama, dan aksi sekunder. Menu navigasi hanya berisi layar-layar ini.
   - 5 pertanyaan juri tersulit + jawaban terbaik.
4. **`docs/03-ARCHITECTURE.md`** (`templates/03-ARCHITECTURE.md`) — stack (pilih yang paling dikuasai tim; graph store tercepat untuk demo kecuali diwajibkan; **library ikon** sesuai A1 dan **library visualisasi graph/data** sesuai A8), perintah verifikasi, **skema graph** (node, edge, properti, masa berlaku, sumber, `Decision` node), **pipeline ekstraksi + penyatuan entitas**, seed data sintetis realistis yang sengaja berisi teks mentah + nama entitas yang tidak konsisten (atau dataset panitia), alur sistem, contoh query multi-hop + query preseden, alur aksi → approval → tulis balik ke graph, mode pembanding RAG, risiko + cadangan. Task 30–120 menit dengan kriteria selesai; task pertama: setup repo + design tokens; task kedua: ekstraksi + penyatuan entitas di seed data.
5. **`docs/04-TODO.md`** (`templates/04-TODO.md`) — dari task di 03, semua ⬜. Setelah task golden demo path, tambahkan 2–4 fitur kecil bernilai besar (A9) sebagai prioritas Could, mis. toggle bandingkan dua akun, filter jalur bukti per tipe node.
6. **`docs/08-DESIGN.md`** (`../project-design/templates/08-DESIGN.md`) — **tanpa preview & iterasi** (hemat waktu):
   - Ada referensi URL → ekstrak nilai asli dengan `../project-design/scripts/extract_styles.js`; screenshot → `../project-design/scripts/extract_colors.py` + baca gambarnya.
   - Tidak ada → AI pilih gaya dashboard B2B yang bersih & padat data (pakai skill `impeccable` jika tersedia).
   - Cakupan: layar di golden demo path + visualisasi graph (warna node per tipe, edge, highlight jalur bukti). Kontras WCAG AA wajib.
   - Format **Google DESIGN.md spec** (token YAML + prosa, lihat bagian "Format" di `../project-design/SKILL.md`). Tidak punya referensi → boleh pakai DESIGN.md dari katalog (mis. getdesign.md) untuk gaya dashboard B2B, ambil token yang relevan saja.
   - Terapkan **Prinsip UX 1–9** dari `../project-design/SKILL.md` dan isi tabelnya di bagian "Do's and Don'ts". Contoh untuk demo ini: health score/risiko di sebelah nama akun, jalur bukti dekat jawaban agent, tombol approve menampilkan konsekuensinya ("Kirim email ke 3 kontak"), panel aksi tetap terlihat saat scroll.
   - Tulis **Standar UI A1–A8** (bagian "Standar UI" di atas) sebagai subbagian "Anti tampilan AI" di bagian "Do's and Don'ts" 08-DESIGN, lengkap dengan penerapan konkret per layar dari daftar layar di PRD (mis. "Layar Akun: skor risiko besar di kanan nama akun, ID akun kecil abu-abu; aksi sekunder di menu ⋯").
   - Isi baris **Ikon** di bagian "Shapes" 08-DESIGN dengan library ikon yang dipilih di 03-ARCHITECTURE (bukan emoji).
   - Jalankan `npx -p @google/design.md designmd lint docs/08-DESIGN.md` → wajib 0 error dan tanpa warning `contrast-ratio` (0 token, tanpa LLM).
   - Terapkan **Standar responsif** dari `../project-design/SKILL.md` dan tulis di bagian "Layout": mobile < 768px = burger 44×44 + drawer, tablet 768–1199px, desktop ≥ 1200px; aturan drawer (scrim, Esc, fokus masuk-terkunci-kembali, scroll terkunci); target sentuh ≥ 44px di bawah 1200px.
   - Catat di ringkasan bahwa preview & penyamaan ≥95% bisa dijalankan nanti lewat `/project-design` kalau ada waktu.
7. **`docs/05-PITCH.md`** (`templates/05-PITCH.md`) — alur cerita, script demo, outline deck, pemetaan kriteria juri, Q&A, dan **Kartu Contekan Bisnis** (bahasa awam + kamus istilah).
8. **`docs/02-AGENT.md`** (`../project-setup/templates/02-AGENT.md`) — konvensi minimum sesuai stack.
9. **`docs/06-WORKFLOW.md`** (`templates/06-WORKFLOW.md`).
10. **`docs/07-RULES.md`** (`../project-setup/templates/07-RULES.md`) — tidak dilemahkan; isi perintah verifikasi + "cek golden demo path". Di checklist UI §8 tambahkan: "Lulus Standar UI A1–A8 di bagian Do's and Don'ts 08-DESIGN (tanpa emoji, tanpa warna bawaan AI, satu layar satu tugas, tanpa elemen tanpa fungsi)". Masukkan baris "UI: Standar UI A1–A8" ke tabel laporan akhir.
11. **`CLAUDE.md`** (`../project-setup/templates/CLAUDE.md`) dan **`AGENTS.md`** (`../project-onboard/templates/AGENTS.md`) — tambahkan: study case di 00-BRIEF, pitch di 05-PITCH, UI wajib ikut 08-DESIGN termasuk Standar UI anti tampilan AI (tanpa emoji, palet dari token, satu layar satu tugas).
12. Jika AI ini punya fitur memori, simpan satu catatan projek: hackathon, track, ide final, deadline, lokasi docs. Kalau tidak, `CLAUDE.md`/`AGENTS.md` sudah cukup sebagai pengingat.

## Langkah 3 — Ringkasan & satu ACC

Tampilkan **satu layar**, bahasa awam:
```
## Docs siap ✅
**Ide:** {{Pakai/Integrasi/Pivot}} — {{1 kalimat + alasan}}
**Untuk siapa & masalahnya:** {{...}}
**Kenapa context graph:** {{1–2 kalimat}}
**Demo yang dilihat juri:** 1. … 2. … 3. … (wow: …)
**Bisnis:** {{harga}} · ROI pelanggan {{...}} [asumsi]
**Stack:** {{...}} · **Desain:** {{gaya / sumber referensi}} · ikon {{library}}
**Layar:** {{nama layar → tugasnya, maks 1 baris per layar}}
**Perlu kamu cek:** {{asumsi penting, hal yang perlu ditanyakan panitia}}
**Logo:** mau aku buatkan 3 konsep logo sekarang (±10 menit)? (ya / nanti / tidak)
**Task pertama:** {{T1}}

ACC, atau ada yang mau diubah?
```
- Ada koreksi → ubah hanya bagian itu + dokumen yang terdampak, tampilkan ringkasan perubahan, minta ACC lagi.
- ACC + logo "ya" → Langkah 3b. ACC + logo "nanti/tidak" → Langkah 4.

## Langkah 3b — Logo (hanya jika user bilang "ya")

Pakai skill `logo-design` jalur cepat (kalau skill itu tidak terpasang, katakan dan lewati langkah ini):
1. Asumsi dari PRD (nama, persona, kata sifat, kompetitor); hindari klise kategori CS/Sales (hati, garis detak jantung, panah naik, perisai, jabat tangan, graph node ruwet).
2. 3 konsep hitam-putih, render dan lihat sendiri, `concept_sheet.py`, lalu **berhenti dan minta user memilih**.
3. Setelah dipilih, kit hackathon saja: simbol + versi kecil (favicon) + lockup horizontal, warna dari token 08-DESIGN, `export_variants.py --web-icons`. Presentation board dan guidelines lengkap dilewati kecuali diminta. Simpan di `docs/brand/`; tambahkan baris logo di bagian "Shapes" 08-DESIGN.
4. Lanjut ke Langkah 4.

## Langkah 4 — Tawaran terakhir: bantu setup projek?

Tanya (alat pertanyaan pilihan bila ada, kalau tidak di chat): **"Docs sudah lengkap. Mau aku bantu setup projeknya sekarang (install backend, frontend, database, dan tools sesuai 03-ARCHITECTURE), atau setup sendiri?"**

**Setup sendiri** → tulis daftar perintah setup lengkap (urut, sesuai stack) di `docs/03-ARCHITECTURE.md` §2 dan tampilkan di chat. Lalu selesai: "Silakan build. Panggil aku lagi kalau ada info baru dari panitia."

**Bantu setup** →
1. Tampilkan dulu rencana singkat: folder struktur, perintah scaffold, daftar dependency + alasan tiap dependency, layanan yang perlu dijalankan (mis. graph DB via Docker). User ACC sekali untuk semuanya.
2. Cek prasyarat yang terpasang (Node/Python/Docker/package manager, versinya). Yang belum ada → beri tahu user cara memasangnya; jangan memasang software sistem tanpa izin.
3. Setup sesuai 03-ARCHITECTURE, mengikuti `docs/07-RULES.md` (ponytail: dependency seminimal mungkin; tanpa dead code):
   - **Backend**: scaffold resmi framework, struktur folder sesuai 02-AGENT, koneksi ke graph store, endpoint health-check.
   - **Frontend**: scaffold resmi, pasang design tokens hasil `npx -p @google/design.md designmd export --format css-tailwind docs/08-DESIGN.md` (Tailwind v4; v3 → `json-tailwind`), bukan ditulis tangan, library ikon (A1), library visualisasi graph/data (A8). Hapus warna, font, dan gaya bawaan scaffold yang tidak sesuai token (A2). Siapkan kerangka navigasi hanya untuk layar di daftar layar PRD (A3–A4). Jika logo sudah dipilih, pasang favicon dan web icons dari `docs/brand/` (hasil `export_variants.py --web-icons`).
   - **Database / graph store**: jalankan (mis. `docker compose`), skrip seed data kosong yang siap diisi.
   - **Tooling**: lint, format, typecheck, test runner, cek dead code; isi perintahnya di 03-ARCHITECTURE §2 dan 07-RULES.
   - `.env.example` (tanpa secret asli), `.gitignore`, `git init`.
   - **Bersihkan sisa boilerplate scaffold** (halaman/komponen/aset contoh yang tidak dipakai) — projek harus bersih dari dead code.
4. Verifikasi: install sukses, backend & frontend jalan (dev server terbuka, health-check merespons), graph store terkoneksi, lint/typecheck/test/build hijau. Kalau gagal → cari penyebab, perbaiki, ulangi.
5. Update 04-TODO (task setup ✅ dengan bukti), lalu laporkan sesuai format laporan 07-RULES + cara menjalankan projek (perintah dev).
6. Tanya apakah mau commit awal; commit hanya jika user setuju.
7. **Berhenti di sini.** Jangan mulai mengerjakan fitur. Tutup dengan: "Setup selesai. Silakan build mulai dari {{task berikutnya}}."

## Setelah selesai

- Skill ini **berhenti**. Tidak ada pengecekan jadwal atau progres. Saat build, AI mengikuti `CLAUDE.md`/`AGENTS.md` dan docs seperti biasa.
- **Mode Update** (hanya jika user meminta, mis. ada klarifikasi panitia/mentor): ubah dokumen terkait + dokumen setelahnya, catat di riwayat perubahan, satu ringkasan + ACC.
- **Latihan:** kalau user bilang ini latihan, jalankan alur yang sama dengan study case contoh di folder terpisah, dan ingatkan bahwa hasilnya (kode & docs) tidak boleh dibawa ke lomba.
