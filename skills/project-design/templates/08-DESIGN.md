---
version: alpha
name: "{{Nama Aplikasi}}"
description: "{{1 kalimat nuansa, mis. tenang, rapi, padat data}}"
colors:
  primary: "{{#hex}}"
  on-primary: "{{#hex}}"
  secondary: "{{#hex}}"
  on-secondary: "{{#hex}}"
  neutral: "{{#hex}}"
  surface: "{{#hex}}"
  on-surface: "{{#hex}}"
  on-surface-muted: "{{#hex}}"
  outline: "{{#hex}}"
  success: "{{#hex}}"
  warning: "{{#hex}}"
  danger: "{{#hex}}"
  on-danger: "{{#hex}}"
  focus-ring: "{{#hex}}"
typography:
  headline-lg:
    fontFamily: "{{Font}}"
    fontSize: "{{32px}}"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "{{-0.02em}}"
  headline-md:
    fontFamily: "{{Font}}"
    fontSize: "{{24px}}"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "{{Font}}"
    fontSize: "{{18px}}"
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontFamily: "{{Font}}"
    fontSize: "{{15px}}"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "{{Font}}"
    fontSize: "{{13px}}"
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: "{{Font}}"
    fontSize: "{{13px}}"
    fontWeight: 500
    lineHeight: 1.2
  label-caps:
    fontFamily: "{{Font}}"
    fontSize: "{{11px}}"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "{{0.06em}}"
rounded:
  sm: "{{4px}}"
  md: "{{8px}}"
  lg: "{{12px}}"
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: "{{24px}}"
  margin: "{{24px}}"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "{{10px}}"
    height: "{{40px}}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: "{{40px}}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-danger}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: "{{40px}}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: "{{40px}}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
  caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-sm}"
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
  divider:
    backgroundColor: "{colors.outline}"
  focus-ring:
    backgroundColor: "{colors.focus-ring}"
---

# {{Nama Aplikasi}} — Design System

> Sumber kebenaran untuk semua kerja UI. Format: [Google DESIGN.md spec](https://github.com/google-labs-code/design.md) (alpha). Token di YAML di atas adalah nilai resmi; jangan pakai warna, ukuran, radius, atau shadow di luar token.
> Status: ✅ ACC {{tanggal}} · Kemiripan referensi {{xx}}% · Lint: {{0 error, n warning}}

## Overview

{{2–4 kalimat: nuansa (3–5 kata sifat), untuk siapa (persona PRD), kesan yang ingin ditimbulkan, padat atau lapang.}}

- **Referensi:** {{R1: URL/gambar/Figma/katalog — diambil: warna, tipografi, ...}} (analisis mentah di `docs/design/refs/`)
- **Dihindari:** {{...}}
- **Mode:** {{light / dark / keduanya}}. {{Jika dark: token dark ditulis dengan awalan `dark-`, mis. `dark-neutral`.}}

## Colors

{{Satu kalimat strategi palet.}}

- **Primary ({{#hex}}):** {{dipakai untuk apa; batas pakainya, mis. maksimal 1 aksi utama per layar}}
- **Secondary ({{#hex}}):** {{...}}
- **Neutral ({{#hex}}) / Surface ({{#hex}}):** latar halaman / kartu dan panel.
- **On-surface ({{#hex}}) / On-surface-muted ({{#hex}}):** teks utama / teks pendukung.
- **Outline ({{#hex}}):** divider dan border, halus.
- **Status (success, warning, danger):** hanya untuk status, bukan dekorasi.
- Warna masuk lewat data dan konten (status, skor, grafik), bukan lewat tombol atau ikon dekoratif.

## Typography

{{Font dan alasannya}}. Sumber: {{Google Fonts / lokal}} · fallback `{{...}}`. Satu keluarga font; hierarki lewat ukuran, ketebalan, warna, dan line-height.

- **Headline:** judul halaman dan section, menonjol tanpa "berteriak".
- **Body:** line-height longgar untuk paragraf; teks pendukung pakai `on-surface-muted`.
- **Label caps:** label kecil kapital dengan letter-spacing.

## Layout

- **Grid & margin:** {{kolom, gutter, margin}} — satu grid untuk semua layar.
- **Container:** max-width {{...}}.
- **Breakpoint & navigasi (Standar responsif `project-design`):**

| Nama | Lebar | Grid | Navigasi |
|---|---|---|---|
| Mobile | < 768px | 1 kolom, gutter 16px | Burger 44×44 + drawer |
| Tablet | 768–1199px | {{2}} kolom | {{Burger + drawer / navigasi penuh}} |
| Desktop | ≥ 1200px | 12 kolom, max {{1280px}} | {{tab / rail}} terlihat |

- **Drawer:** {{sisi}}, lebar ≤ 85vw, scrim; tutup via scrim/close/Esc/pilih item; `aria-expanded`, fokus masuk-terkunci-kembali, scroll terkunci.
- **Urutan konten mobile:** {{urutan kartu/section}}.
- **Target sentuh:** ≥ 44px di bawah 1200px, ≥ 36px di desktop. Body ≥ 16px di mobile. Tanpa scroll horizontal di 360px.
- **Kepadatan:** {{longgar / sedang / padat}}. Spacing menyatakan hubungan: elemen yang berkaitan dirapatkan.
- **Pola layar (dari PRD):**

| Layar | Tugas | Pola layout | Info utama (besar) | Info pendukung (kecil) |
|---|---|---|---|---|
| {{...}} | {{...}} | {{...}} | {{...}} | {{...}} |

## Elevation & Depth

{{Shadow atau tonal/border? Nilai shadow bila dipakai, mis. `sm: 0 1px 2px rgba(0,0,0,.06)` untuk kartu, `md: 0 8px 24px rgba(0,0,0,.12)` untuk popover/modal.}}

## Shapes

- **Radius:** {{komponen mana pakai sm/md/lg/full}}.
- **Ikon:** {{library, mis. Lucide}} — satu gaya ({{outline}}, stroke {{1.5}}), ukuran default {{16/20px}}. Tanpa emoji sebagai ikon.
- **Gambar/ilustrasi:** {{gaya, rasio, radius}} — satu gaya untuk semua.

## Components

{{Prosa per komponen yang dipakai PRD. Token ada di YAML; di sini anatomi dan state.}}

- **Button:** primary untuk satu aksi utama per layar; tidak huruf kapital semua. State: hover {{...}}, active {{...}}, focus ring 2px `focus-ring` offset 2px, disabled opacity .5, loading spinner + label tetap. Konsekuensi aksi ditulis di label bila relevan (mis. "Kirim ke 3 kontak").
- **Input:** label selalu ada; error memakai `danger` + pesan di bawah input.
- **Card:** {{...}}. Aksi sekunder di menu ⋯.
- **Navigasi:** hanya layar di daftar layar PRD; link sekunder di popover.
- **Badge:** singkat, cepat dipindai.
- **Motion:** {{150–250ms}}, easing `{{...}}`; hormati `prefers-reduced-motion`.
- {{Modal, toast, tabel, empty state, skeleton — hanya yang dibutuhkan PRD.}}

## Do's and Don'ts

**Prinsip UX (wajib, semua layar)**

| # | Prinsip | Penerapan di projek ini |
|---|---|---|
| 1 | Desain untuk sistem: tahan variasi konten (gambar terang/gelap, teks panjang, data kosong/banyak) | {{...}} |
| 2 | Konsisten: satu grid, satu keluarga font, satu gaya ikon, satu gaya gambar | {{...}} |
| 3 | Hierarki: warna mendukung konten; judul menonjol tanpa berteriak; paragraf nyaman dibaca | {{...}} |
| 4 | Info di titik keputusan: sinyal kepercayaan dekat objeknya, angka penting terlihat awal, kontrol terkait berdampingan | {{...}} |
| 5 | Konsekuensi terlihat sebelum aksi | {{...}} |
| 6 | Kurangi hambatan: aksi utama selalu terjangkau, konteks tetap terlihat saat scroll, pilihan siap pakai + input manual | {{...}} |
| 7 | Hapus yang berlebihan: label redundan, badge panjang, info yang bisa berubah di judul | {{...}} |
| 8 | Detail premium: divider halus, spacing menyatakan hubungan, letter-spacing label kecil kapital | {{...}} |
| 9 | Aksi utama paling jelas tapi tidak agresif | {{...}} |

**Aksesibilitas**
- Do: kontras teks ≥ 4.5:1, teks besar/elemen UI ≥ 3:1 (dicek `lint`); focus selalu terlihat; semua aksi bisa lewat keyboard; target sentuh ≥ 44×44px; label untuk setiap input; `aria-label` untuk ikon tanpa teks.
- Don't: menyampaikan informasi hanya lewat warna.

**Checklist review UI**
- [ ] Hanya memakai token dari file ini
- [ ] Semua state komponen ada (hover, focus, disabled, loading, empty, error)
- [ ] Responsif di 375px, 768px, 1440px tanpa scroll horizontal
- [ ] Lulus Prinsip UX 1–9, diuji dengan konten ekstrem (teks panjang, data kosong, gambar terang/gelap)
- [ ] `lint` 0 error

## Deviations from Reference

| Aspek | Referensi | Di sini | Alasan |
|---|---|---|---|
| {{...}} | {{...}} | {{...}} | {{kontras AA / Prinsip UX #n dilanggar referensi / kebutuhan PRD}} |

## Implementation

Token tidak ditulis ulang di kode; hasilkan dari file ini (Windows: pakai alias `designmd`):

```bash
npx -p @google/design.md designmd lint docs/08-DESIGN.md
npx -p @google/design.md designmd export --format css-tailwind docs/08-DESIGN.md > {{src/styles/theme.css}}
```

Format lain: `json-tailwind` (Tailwind v3), `dtcg` (W3C tokens). Setelah mengubah token: jalankan ulang `lint` dan `export`, lalu `diff` terhadap versi sebelumnya untuk mendeteksi regresi.

## Changelog

| Tanggal | Perubahan |
|---|---|
| {{tanggal}} | Dokumen awal, kemiripan {{xx}}% |
