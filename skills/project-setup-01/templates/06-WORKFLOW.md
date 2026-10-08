# 06 — WORKFLOW: Aturan Main (Mode Hackathon)

> Prinsip: golden demo path selalu bisa jalan. Lebih baik 3 fitur stabil daripada 6 fitur setengah jadi.

## 1. Alur per Task
1. Ambil task dari 04-TODO sesuai pemilik/prioritas → 🟦.
2. Baca bagian terkait di 03-ARCHITECTURE; ambigu → tanya, jangan menebak.
3. Implementasi minimal yang memenuhi kriteria selesai.
4. Verifikasi sesuai 07-RULES, termasuk cek golden demo path.
5. Commit kecil dan sering; update 04-TODO; laporkan.

## 2. Boleh Jalan Sendiri
- Mengerjakan task di 04-TODO, menjalankan semua pemeriksaan, memperbaiki error dari perubahan sendiri
- Menambah/memperbaiki seed data untuk skenario demo
- Commit lokal per task

## 3. Wajib Minta Izin
- Menambah dependency besar atau mengganti stack/graph store
- Mengubah skema graph yang sudah dipakai fitur lain
- Fitur di luar 01-PRD atau mengubah golden demo path
- Push ke branch utama, deploy demo, aksi ke layanan eksternal
- Memotong scope (✂️) — usulkan dengan alasan, user memutuskan

## 4. Prioritas
- Kerjakan task sesuai urutan 04-TODO; golden demo path dulu, sisanya belakangan.
- Kalau task jauh lebih rumit dari perkiraan, usulkan versi lebih sederhana yang tetap memenuhi golden demo path.

## 5. Definition of Done
- [ ] Kriteria selesai di 03-ARCHITECTURE terpenuhi
- [ ] Semua pemeriksaan di 07-RULES hijau dengan bukti
- [ ] Golden demo path masih jalan end-to-end
- [ ] Tidak ada dead code / debug log tersisa
- [ ] 04-TODO diupdate, laporan diberikan

## 6. Prioritas Saat Konflik
07-RULES > instruksi user > 00-BRIEF > 01-PRD > 08-DESIGN (untuk UI) > 06-WORKFLOW > 03-ARCHITECTURE > 02-AGENT
