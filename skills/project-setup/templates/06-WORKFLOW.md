# 06 — WORKFLOW: Aturan Main

> Tingkat otonomi: **{{Konservatif / Seimbang / Otonom}}**

## 1. Alur Kerja per Task
1. Ambil task berikutnya dari 04-TODO (atau yang diminta user). Ubah status → 🟦 In Progress.
2. Baca bagian terkait di 03-ARCHITECTURE. Kalau ada yang ambigu → tanya dulu, jangan menebak.
3. Implementasi sesuai 02-AGENT.
4. Verifikasi sesuai 07-RULES sampai semua hijau.
5. Update 04-TODO (status, bukti verifikasi, log).
6. Laporkan ke user dengan format laporan di 07-RULES.

## 2. Boleh Jalan Sendiri (tanpa izin)
- Membaca file, menjalankan test/build/lint/typecheck
- Mengerjakan task yang sudah ada di 04-TODO sesuai rencana
- Memperbaiki error yang muncul dari perubahan sendiri
- Menghapus dead code yang dihasilkan perubahan sendiri
- {{...}}

## 3. Wajib Minta Izin Dulu
- Menambah/menghapus/upgrade dependency
- Mengubah skema database atau migrasi data
- Mengubah tech stack, arsitektur, atau API publik
- Menghapus file/fitur yang bukan bagian task
- Menyimpang dari PRD atau menambah fitur di luar scope
- Git push, deploy, atau aksi ke layanan eksternal
- Mengubah file konfigurasi CI / env / secret
- {{...}}

## 4. Definisi Selesai (Definition of Done)
Sebuah fitur/task dianggap **selesai** hanya jika:
- [ ] Kriteria selesai di 03-ARCHITECTURE terpenuhi
- [ ] Semua pemeriksaan wajib di 07-RULES hijau, dengan bukti
- [ ] Ada test untuk perilaku baru / bug yang diperbaiki
- [ ] Tidak ada dead code, debug log, atau TODO liar tersisa
- [ ] 04-TODO sudah diupdate
- [ ] Laporan sudah diberikan ke user

## 5. Git
- Commit: {{setiap task selesai / saat diminta}} dengan format dari 02-AGENT.
- Push: {{hanya saat diminta}}.

## 6. Saat Ragu atau Buntu
- Ambiguitas requirement → tanya user, catat jawabannya di 03-ARCHITECTURE (Q&A).
- Gagal memperbaiki error setelah beberapa pendekatan berbeda → berhenti, jelaskan apa yang sudah dicoba dan dugaan penyebabnya, minta arahan.
- Konflik antar dokumen → urutan prioritas: 07-RULES > 01-PRD > 06-WORKFLOW > 03-ARCHITECTURE > 02-AGENT.
