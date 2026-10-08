---
name: project-setup
description: Setup projek baru lewat sesi tanya-jawab, lalu bikin folder docs/ berisi 7 dokumen berurutan (01-PRD, 02-AGENT, 03-ARCHITECTURE, 04-TODO, 05-SKILL, 06-WORKFLOW, 07-RULES) plus CLAUDE.md supaya AI paham projek sekali baca. Pakai saat user bilang "setup projek", "mulai projek baru", "bikin PRD", "bikin docs projek", "/project-setup", atau saat mau mulai ngoding pertama kali di projek yang sudah punya docs/01-PRD.md tapi belum di-onboard.
---

# Project Setup

Tujuan: dari ide mentah jadi 7 dokumen yang matang, lalu AI cukup baca sekali dan langsung kerja sesuai aturan.

Semua komunikasi pakai bahasa user (default Bahasa Indonesia, santai tapi jelas).

## Tentukan mode dulu

- **Mode A — Setup baru**: `docs/01-PRD.md` belum ada. Jalankan Fase 1–4.
- **Mode B — Onboarding**: `docs/` sudah lengkap, user mau mulai ngoding. Langsung ke Fase 4.
- **Mode C — Update**: user minta ubah salah satu dokumen. Edit dokumen itu, cek dampaknya ke dokumen setelahnya (urutan 01→07), tanyakan apakah ikut diupdate, lalu perbarui ringkasan di `CLAUDE.md`.

## Aturan umum sesi tanya-jawab

- Tanya **sebelum** menulis tiap dokumen. Jangan pernah bikin dokumen dari asumsi diam-diam.
- Maksimal 3–5 pertanyaan per putaran. Pakai `AskUserQuestion` kalau jawabannya bisa berupa pilihan; pertanyaan terbuka tanya biasa.
- Kalau user jawab "terserah"/"belum tahu", **kasih rekomendasi + alasannya**, lalu minta konfirmasi.
- Tunjukkan ringkasan/draf, lalu minta ACC eksplisit ("ACC", "oke", "lanjut"). Belum ACC = revisi, ulangi.
- Dokumen ditulis berurutan. Dokumen berikutnya wajib konsisten dengan dokumen sebelumnya yang sudah di-ACC.
- Template ada di folder `templates/` di samping file ini. Isi semua placeholder `{{...}}`; hapus bagian yang memang tidak relevan, jangan biarkan placeholder kosong.

## Fase 1 — PRD (paling penting, jangan dipercepat)

1. Buka dengan: "Ceritain dulu gambaran aplikasi yang mau kamu bikin."
2. Follow-up terus sampai semua poin ini jelas (gali lebih dalam kalau jawaban masih kabur, tantang ide yang lemah dengan sopan):
   - Masalah apa yang diselesaikan & kenapa sekarang
   - Target pengguna / persona, target pasar
   - Solusi & value proposition, pembeda dari kompetitor/alternatif
   - Fitur inti MVP (prioritaskan: must / should / could)
   - Di luar scope (eksplisit!)
   - Platform (web/mobile/desktop/API), tech stack yang diinginkan atau batasan stack
   - Waktu pengembangan / deadline, ukuran tim, budget/hosting
   - Model bisnis (kalau ada), metrik sukses
   - Risiko & asumsi
3. Tampilkan ringkasan PRD lengkap dalam chat → minta ACC.
4. Setelah ACC, tulis `docs/01-PRD.md` dari `templates/01-PRD.md`.

## Fase 2 — Architecture

1. Turunkan rencana dari PRD. Kalau ada yang ambigu atau berisiko (data model, auth, integrasi pihak ketiga, skala, hosting, realtime, pembayaran, dsb), **tanya dulu** — catat semua tanya-jawab di bagian "Q&A Keputusan".
2. Usulkan tech stack final (framework, bahasa, database, ORM, auth, hosting, CI, testing tools, linter) dengan alasan singkat. Minta ACC.
3. Pecah implementasi jadi milestone → task kecil (≤ ~1 hari kerja per task), tiap task punya **kriteria selesai** yang bisa diverifikasi.
4. Tulis `docs/03-ARCHITECTURE.md`.

> Catatan urutan: tanya-jawab architecture dilakukan sebelum 02-AGENT karena konvensi koding bergantung pada stack. File tetap dinomori 01→07.

## Fase 3 — Dokumen sisanya (berurutan)

Untuk tiap dokumen: tanya singkat → tulis → tunjukkan poin pentingnya → lanjut.

- **02-AGENT.md** — tanya: gaya penamaan, gaya komentar, struktur folder, format commit, bahasa komentar/UI, preferensi lain. Kalau user tidak punya preferensi, pakai best practice dari stack yang dipilih. Uji: "bisakah developer lain paham isi ini?"
- **04-TODO.md** — turunkan otomatis dari task di 03-ARCHITECTURE (ID task harus sama). Semua status awal `⬜ Todo`. Tanya hanya kalau prioritas ambigu.
- **05-SKILL.md** — tanya: prompt apa yang sering dipakai ulang? Selalu sertakan minimal: testing, security review, refactor, debugging, code review, dead-code sweep.
- **06-WORKFLOW.md** — tanya: seberapa otonom AI boleh jalan (konservatif / seimbang / otonom)? Hal apa yang wajib minta izin? Kapan commit/push?
- **07-RULES.md** — isi hampir tetap (lihat template). Tanya hanya: perintah test/build/typecheck/lint yang dipakai — kalau belum ada, tentukan dari stack dan tulis sebagai rencana.

## Fase 4 — Onboarding (baca sekali, simpan di memori)

1. Baca **semua** `docs/01..07` sekali.
2. Buat/perbarui `CLAUDE.md` di root projek dari `templates/CLAUDE.md`. File ini otomatis dimuat Claude Code tiap sesi, jadi AI tidak perlu cek docs berulang-ulang. Isinya:
   - Ringkasan aplikasi (3–5 baris dari PRD)
   - Stack & perintah verifikasi
   - Import `@docs/07-RULES.md` dan `@docs/06-WORKFLOW.md` (dimuat penuh, karena paling penting)
   - Ringkasan konvensi dari 02-AGENT
   - Pointer ke dokumen lain untuk dibaca **hanya saat relevan** (03 saat mulai task baru, 04 untuk update progres, 05 saat butuh pola prompt)
3. Buat juga `AGENTS.md` di root dari `../project-onboard/templates/AGENTS.md` (dibaca Codex, Cursor, Copilot, Gemini CLI, dll.), supaya kalau user pindah AI, AI lain langsung tahu harus baca docs/ dan mengikuti rules.
4. Simpan juga satu memori `project` (lewat sistem memori) berisi: nama aplikasi, tujuan, stack, dan "aturan ada di docs/07-RULES.md, onboarding sudah dilakukan tanggal X". Jangan duplikasi isi docs ke memori.
5. Laporkan ke user: dokumen yang dibuat, ringkasan aplikasi, task pertama dari 04-TODO, dan tanya "Mulai dari task {{ID}}?"

## Setelah setup

Saat ngoding selanjutnya, AI mengikuti `CLAUDE.md` (yang sudah memuat rules & workflow). Docs dibaca ulang hanya jika: user bilang docs berubah, task menyentuh area yang tidak tercakup ringkasan, atau ada konflik aturan.
