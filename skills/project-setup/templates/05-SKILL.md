# 05 — SKILL: Pola Prompt yang Dipakai Ulang

> Panggil dengan menyebut nama pola, contoh: "jalankan pola Security Review untuk folder src/api".

## Testing
Tulis/lengkapi test untuk {{target}}:
1. Daftar perilaku yang harus benar, termasuk edge case & error path.
2. Tulis test (format sesuai 02-AGENT), jalankan, pastikan gagal dulu kalau fitur belum ada.
3. Implementasi/perbaiki sampai hijau. Dilarang melemahkan assertion atau men-skip test.
4. Laporkan cakupan perilaku yang ditest.

## Security Review
Periksa {{target}} untuk: input validation, injection (SQL/command/XSS), authn/authz, secret di kode, data sensitif di log, dependency rentan, CORS/CSRF, rate limiting. Tiap temuan: lokasi, risiko (tinggi/sedang/rendah), skenario serangan, perbaikan.

## Refactor
Refactor {{target}} tanpa mengubah perilaku:
1. Pastikan ada test yang mengunci perilaku; kalau belum, tulis dulu.
2. Sederhanakan: hapus duplikasi, pecah fungsi panjang, perjelas nama.
3. Jalankan seluruh pemeriksaan di 07-RULES. Perilaku harus identik.

## Debugging
Bug: {{gejala}}.
1. Reproduksi dulu (test yang gagal kalau memungkinkan).
2. Cari akar masalah, bukan gejalanya. Jelaskan penyebabnya.
3. Perbaiki, tambah regression test, jalankan semua pemeriksaan.

## Code Review
Review {{diff/file}}: kebenaran logika, edge case, konsistensi dengan 02-AGENT, keterbacaan, performa, keamanan, test yang kurang. Urutkan temuan dari paling parah.

## Dead-Code Sweep
Cari dan hapus kode tak terpakai di seluruh projek: export/fungsi/variabel/komponen/file yang tidak direferensikan, import tak terpakai, dependency di manifest yang tidak dipakai, kode yang di-comment-out, feature flag mati. Pakai tool dead-code dari 03-ARCHITECTURE. Jalankan semua pemeriksaan setelahnya.

## {{Pola Tambahan dari User}}
{{...}}
