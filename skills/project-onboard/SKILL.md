---
name: project-onboard
description: Baca dan pahami seluruh dokumen projek (docs/00 sampai docs/08 hasil skill project-setup atau project-setup-01) dalam sekali jalan, lalu simpan pemahamannya supaya sesi berikutnya tidak perlu baca ulang. Pakai saat user bilang "pahami projek ini", "baca docs", "onboard", "lanjutin projek", "aku pindah AI", "/project-onboard", atau saat mulai sesi baru di projek yang punya folder docs/ berisi 01-PRD.md dan belum ada pemahaman tersimpan.
---

# Project Onboard

Tujuan: AI baru (atau sesi baru) langsung paham **aplikasi apa ini, aturannya apa, alur kerjanya gimana, dan progresnya sampai mana**, lalu siap lanjut ngoding.

Komunikasi pakai bahasa user (default Bahasa Indonesia).

## Langkah 1 — Cek dokumen

Cari semua file `docs/00-*.md` sampai `docs/08-*.md` di root projek (projek hackathon memakai 00-BRIEF dan 05-PITCH; projek biasa memakai 05-SKILL).
- Tidak ada `docs/` sama sekali → bilang ke user dan tawarkan skill `project-setup` (atau `project-setup-01` untuk hackathon). Berhenti.
- Ada sebagian → lanjut, tapi catat dokumen mana yang hilang untuk dilaporkan.

## Langkah 2 — Baca semua, berurutan, sampai habis

Baca 01 → 07 **secara penuh** (jangan dipotong, jangan cuma skim judul). Baca juga `CLAUDE.md` / `AGENTS.md` kalau sudah ada.

Saat membaca, tangkap:
| Dokumen | Yang harus dipahami |
|---|---|
| 01-PRD | Apa aplikasinya, untuk siapa, masalahnya, fitur MVP, yang di luar scope, deadline |
| 02-AGENT | Struktur folder, penamaan, gaya komentar, format test, format commit |
| 03-ARCHITECTURE | Stack, perintah verifikasi, data model, milestone & task, Q&A keputusan, pertanyaan terbuka |
| 04-TODO | Task mana yang Done / In Progress / Blocked, bug terbuka, task berikutnya |
| 05-SKILL | Nama-nama pola prompt yang tersedia |
| 06-WORKFLOW | Tingkat otonomi, apa yang wajib minta izin, Definition of Done |
| 07-RULES | Semua aturan wajib — ini prioritas tertinggi |
| 08-DESIGN (jika ada) | Nuansa desain, token warna/font/radius, komponen — wajib dipakai saat kerja UI |

## Langkah 3 — Cocokkan dengan kondisi nyata repo

Docs bisa ketinggalan dari kode. Cek cepat (jangan baca seluruh codebase):
- `git log --oneline -15` dan `git status` (kalau repo git) — apakah ada pekerjaan yang belum tercatat di 04-TODO?
- Apakah struktur folder sesuai 02-AGENT? Apakah file konfigurasi untuk perintah verifikasi di 03 memang ada (package.json scripts, pyproject, dsb.)?
- Apakah ID task di 04-TODO sama dengan 03-ARCHITECTURE?

Catat setiap ketidakcocokan. **Jangan memperbaikinya diam-diam** — laporkan dan tanya.

## Langkah 4 — Simpan pemahaman (supaya cukup sekali)

1. **`AGENTS.md`** di root (dibaca oleh Codex, Cursor, Copilot, Gemini CLI, dll. — berguna kalau user pindah AI lagi). Buat dari `templates/AGENTS.md` kalau belum ada; kalau sudah ada, perbarui ringkasannya saja.
2. **`CLAUDE.md`** di root: kalau belum ada, isi cukup:
   ```
   @AGENTS.md
   @docs/07-RULES.md
   @docs/06-WORKFLOW.md
   ```
   Kalau sudah ada (buatan project-setup), biarkan; cukup pastikan ringkasannya masih akurat.
3. **Memori** (kalau AI punya sistem memori): satu entri tipe `project` berisi nama aplikasi, tujuan satu kalimat, stack, lokasi aturan (`docs/07-RULES.md`), dan tanggal onboarding. Jangan salin isi docs ke memori.

## Langkah 5 — Laporkan pemahaman ke user

Pakai format ini, singkat dan padat:

```
## Pemahamanku tentang projek ini
**Aplikasi:** {{nama}} — {{satu kalimat}}
**Untuk:** {{target pengguna}}
**MVP:** {{fitur inti, ringkas}}  ·  **Di luar scope:** {{...}}
**Stack:** {{...}}
**Verifikasi:** test `...` · build `...` · typecheck `...` · lint `...` · dead code `...`

**Aturan utama yang akan kuikuti:**
- {{3–6 poin terpenting dari 07-RULES}}
**Otonomi:** {{level}} — wajib izin untuk: {{ringkas}}

**Progres:** {{x}}/{{y}} task selesai ({{%}}). Sedang jalan: {{...}}. Blocked: {{...}}
**Task berikutnya:** {{ID}} — {{nama}} (kriteria selesai: {{...}})

**Perlu perhatian:**
- {{dokumen hilang / ketidakcocokan docs vs repo / pertanyaan terbuka — atau "Tidak ada"}}

Lanjut kerjakan {{ID}}?
```

Kalau ada pertanyaan terbuka di 03-ARCHITECTURE yang menghalangi task berikutnya, tanyakan sekarang.

## Setelah onboarding

- Jangan membaca ulang seluruh docs di sesi yang sama atau sesi berikutnya; `CLAUDE.md`/`AGENTS.md` sudah memuat yang penting.
- Baca ulang dokumen tertentu hanya jika: mulai task baru (bagian terkait di 03), update progres (04, wajib), user bilang docs berubah, atau ada konflik aturan.
- Urutan prioritas jika konflik: 07-RULES > instruksi user > 00-BRIEF (jika ada) > 01-PRD > 08-DESIGN (untuk UI) > 06-WORKFLOW > 03-ARCHITECTURE > 02-AGENT.
