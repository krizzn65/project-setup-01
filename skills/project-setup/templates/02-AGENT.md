# 02 — AGENT: Instruksi untuk AI

> Konvensi yang harus diikuti AI (dan developer manusia) di projek ini.
> Uji kualitas: developer lain harus bisa memahami isi file ini tanpa penjelasan tambahan.

## 1. Konteks Singkat
- **Aplikasi:** {{Nama}} — {{satu kalimat dari PRD}}
- **Stack:** {{ringkas dari 03-ARCHITECTURE}}

## 2. Struktur Folder
```
{{tree folder utama + fungsi tiap folder}}
```

## 3. Gaya Koding
- **Penamaan:** {{variabel camelCase, komponen PascalCase, file kebab-case, konstanta UPPER_SNAKE, ...}}
- **Prinsip:** fungsi kecil & satu tanggung jawab; utamakan solusi paling sederhana yang benar; pakai standard library/fitur bawaan framework sebelum menambah dependency.
- **Typing:** {{strict mode, hindari any, ...}}
- **Error handling:** {{pola yang dipakai}}
- **Formatter / linter:** {{Prettier, ESLint, Ruff, ...}} — config di repo adalah sumber kebenaran.

## 4. Gaya Komentar
- Komentar menjelaskan **kenapa**, bukan **apa**.
- Bahasa komentar: {{Indonesia / Inggris}}
- {{Docstring/JSDoc untuk fungsi publik, dsb.}}
- Tidak ada kode yang di-comment-out; hapus saja (ada git).

## 5. Testing
- **Framework:** {{Vitest / Jest / Pytest / ...}}
- **Lokasi & penamaan:** {{`*.test.ts` di samping file / folder tests/}}
- **Format:** Arrange–Act–Assert; satu perilaku per test; nama test mendeskripsikan perilaku.
- **Wajib ditest:** logika bisnis, validasi, bug yang pernah terjadi (regression test).

## 6. Dependency
- Tambah dependency hanya jika jelas lebih sederhana dari menulis sendiri; sebutkan alasannya di laporan.
- {{Package manager: npm / pnpm / bun / pip / ...}}

## 7. Git
- **Format commit:** {{Conventional Commits: `feat: ...`, `fix: ...`}}
- **Branch:** {{...}}

## 8. Lain-lain
- {{Bahasa UI, aksesibilitas, i18n, keamanan, dsb.}}
