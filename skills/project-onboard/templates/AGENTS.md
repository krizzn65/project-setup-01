# {{Nama Aplikasi}}

> Instruksi untuk semua AI coding assistant. Onboarding terakhir: {{tanggal}}.
> Sumber kebenaran ada di `docs/`. File ini ringkasannya.

## WAJIB sebelum ngoding pertama kali
Jika kamu AI yang belum pernah bekerja di projek ini, baca **seluruh** file di `docs/` (00 sampai 08, yang ada) secara berurutan satu kali, lalu ikuti aturannya. Setelah itu cukup rujuk file ini.

## Aplikasi
{{3–5 baris: apa, untuk siapa, masalah, fitur MVP, di luar scope.}}

## Stack & Perintah Verifikasi
- **Stack:** {{...}}
- **Test:** `{{...}}` · **Build:** `{{...}}` · **Typecheck:** `{{...}}` · **Lint:** `{{...}}` · **Dead code:** `{{...}}`

## Aturan Wajib (ringkas — lengkapnya di docs/07-RULES.md)
- Tuntaskan setiap permintaan sesuai aturan projek.
- Setiap perubahan kode: jalankan test, build, typecheck, lint, cek dead code, dan cek fungsi terkait.
- Error → cari akar penyebab, perbaiki, ulangi semua pemeriksaan sampai hijau.
- Dilarang skip pemeriksaan, melemahkan test, atau klaim selesai tanpa bukti.
- Pemeriksaan yang tidak bisa dijalankan → jelaskan dengan jujur.
- Projek harus bersih dari dead code.
- Solusi paling sederhana yang benar (YAGNI, standard library & fitur bawaan dulu, dependency baru harus izin). Pakai skill `ponytail` jika tersedia.
- Kerja UI: ikuti docs/08-DESIGN.md (jika ada) + checklist UI/UX (responsif, kontras AA, keyboard, semua state). Pakai skill `impeccable` jika tersedia.
- Output perintah panjang lewat `rtk` jika terpasang; jangan menebak dari output terpotong.
- Selesai kerja → laporkan perubahan, pemeriksaan, dan hasilnya.

## Aturan Main (ringkas — lengkapnya di docs/06-WORKFLOW.md)
- **Otonomi:** {{level}}
- **Wajib minta izin:** {{ringkas}}
- **Selesai =** kriteria di 03 terpenuhi + semua cek hijau + ada test + 04-TODO diupdate + laporan.

## Konvensi (ringkas — lengkapnya di docs/02-AGENT.md)
- {{5–8 poin}}

## Kapan baca docs
- Mulai task baru → bagian terkait di `docs/03-ARCHITECTURE.md`
- Status task berubah → update `docs/04-TODO.md` (wajib)
- Pola testing/review/refactor → `docs/05-SKILL.md` (jika ada)
- Pitch & script demo (projek hackathon) → `docs/05-PITCH.md`
- Aturan kerja always-on (kode, UI, output perintah, gaya chat) → `docs/ALWAYS-ON.md` (jika ada) — wajib diikuti setiap respons
- Ragu scope → `docs/01-PRD.md`
- Konflik aturan → prioritas: 07-RULES > instruksi user > 00-BRIEF (jika ada) > 01-PRD > 08-DESIGN (untuk UI) > 06-WORKFLOW > 03-ARCHITECTURE > 02-AGENT
