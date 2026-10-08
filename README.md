# project-setup-01

Skill Claude Code untuk **hari H hackathon, track "Context Graphs in Customer Success and Sales"** (build dari nol). Satu putaran pertanyaan, lalu AI menyusun seluruh dokumentasi projek sekaligus, satu kali ACC, opsional konsep logo, lalu tawaran bantu setup projek. Berhenti sebelum mengerjakan fitur.

## Isi repo

| Folder | Fungsi |
|---|---|
| `skills/project-setup-01/` | Skill utama (hackathon) + template 00-BRIEF, 01-PRD, 03-ARCHITECTURE, 04-TODO, 05-PITCH, 06-WORKFLOW |
| `skills/project-setup/` | Dipakai untuk template 02-AGENT, 07-RULES, CLAUDE.md (juga bisa dipakai sendiri untuk projek non-hackathon) |
| `skills/project-onboard/` | Dipakai untuk template AGENTS.md (supaya AI lain, mis. Cursor/Codex, ikut aturan yang sama) |
| `skills/project-design/` | Dipakai untuk 08-DESIGN (format Google DESIGN.md spec), Prinsip UX, standar responsif, script ekstraksi warna/gaya |

`project-setup-01` merujuk ketiga skill lain lewat path `../project-setup`, `../project-onboard`, `../project-design`, jadi **keempatnya harus dipasang berdampingan**.

## Pasang

Windows (PowerShell):

```powershell
git clone https://github.com/krizzn65/project-setup-01.git
Copy-Item -Recurse -Force project-setup-01\skills\* "$env:USERPROFILE\.claude\skills\"
```

macOS / Linux:

```bash
git clone https://github.com/krizzn65/project-setup-01.git
mkdir -p ~/.claude/skills && cp -R project-setup-01/skills/* ~/.claude/skills/
```

Mulai sesi Claude Code baru, lalu ketik `/project-setup-01` (atau "hackathon", "study case").

## Kebutuhan

Wajib:
- Claude Code
- Node.js 18+ (untuk `npx -p @google/design.md designmd lint|export` — cek kontras dan export token desain)
- Python 3 + Pillow (`pip install pillow`) untuk `extract_colors.py` bila referensi desain berupa gambar

Opsional (skill pihak ketiga; skill tetap jalan tanpa ini, hanya bagian terkait yang dilewati):
- [`logo-design`](https://github.com/kaankiziltug/logo-design-skill) — untuk Langkah 3b (3 konsep logo + favicon)
- `impeccable` — kualitas visual UI
- `ponytail` — solusi kode paling sederhana
- `rtk` — output perintah yang hemat token

## Alur singkat

1. **Satu putaran pertanyaan:** study case, pakai ide finalis atau tidak, stack yang dikuasai tim, referensi desain.
2. **Pertanyaan bisnis (opsional, 3–5):** berpijak pada study case, bahasa awam, selalu ada rekomendasi jawaban.
3. **AI menyusun semua docs sekaligus** di `docs/`: 00-BRIEF, 01-PRD (Startup Canvas kritis + golden demo path + daftar layar), 02-AGENT, 03-ARCHITECTURE (skema context graph, ekstraksi, penyatuan entitas, pembanding RAG), 04-TODO, 05-PITCH (script demo + Kartu Contekan Bisnis), 06-WORKFLOW, 07-RULES, 08-DESIGN, plus CLAUDE.md dan AGENTS.md.
4. **Satu ringkasan + satu ACC.**
5. **Opsional: 3 konsep logo** (berhenti untuk dipilih, lalu kit ringkas di `docs/brand/`).
6. **Tawaran setup projek:** install backend, frontend, database, tooling; verifikasi semua jalan; lalu berhenti.

Aturan lomba yang dijaga: semua docs dan kode dibuat saat lomba; ide finalis hanya dipakai sebagai teks masukan.
