---
name: project-design
description: Bikin docs/08-DESIGN.md — design system projek yang dianalisis dari referensi desain user (screenshot, URL website, Figma, Dribbble) dan disesuaikan dengan kebutuhan di docs/ (PRD, stack). AI memahami docs dulu, minta referensi (atau DESIGN.md dari katalog), mengekstrak token desain asli (warna hex, font, ukuran, radius, shadow, spacing) ke format Google DESIGN.md spec, mengecek kontras lewat linter resmi, membuat preview, membandingkan berdampingan dengan referensi sampai kemiripan ≥95%, lalu minta ACC. Pakai saat user bilang "bikin design", "DESIGN.md", "design system", "aku punya referensi desain", "samain kayak desain ini", "/project-design".
---

# Project Design

Tujuan: menghasilkan `docs/08-DESIGN.md` yang (1) setia ke referensi desain user dengan target kemiripan ≥95%, dan (2) cocok dengan kebutuhan projek di docs/. AI lain yang membaca file ini harus bisa membangun UI yang konsisten tanpa melihat referensinya.

Komunikasi pakai bahasa user (default Bahasa Indonesia). Ikuti `docs/07-RULES.md` dan `docs/06-WORKFLOW.md` projek.

## Prinsip akurasi (wajib)

- **Ukur, jangan tebak.** Nilai dari URL diambil dari computed style; warna dari gambar diambil dari piksel (`scripts/extract_colors.py`). Nilai yang terpaksa diestimasi (mis. ukuran font dari screenshot) diberi label `~` dan dikonfirmasi saat perbandingan visual.
- **Jangan mengarang dari ingatan.** Kalau user cuma menyebut nama ("kayak Linear"), minta URL atau screenshot. Kalau tidak bisa, boleh buka website resminya sendiri lalu ekstrak.
- **95% itu target yang dicek**, bukan klaim. Kemiripan dinilai lewat checklist berbobot di Langkah 6 dan perbandingan berdampingan, dan keputusan akhir ada di user.

## Format: Google DESIGN.md spec

`08-DESIGN.md` mengikuti [spec resmi Google](https://github.com/google-labs-code/design.md) (status alpha):
- **YAML front matter** = token resmi (`colors`, `typography`, `rounded`, `spacing`, `components`). Nilai ditulis **sekali** di sini; kode dihasilkan lewat `export`, tidak ditulis ulang.
- **Markdown** = alasan dan cara pakai, urutan bagian baku: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. Bagian tambahan (Deviations from Reference, Implementation, Changelog) ditaruh setelahnya.
- **CLI tanpa LLM (0 token, butuh internet saat pertama dijalankan):** pakai alias `designmd` (berfungsi di semua OS, wajib di Windows):
  - `npx -p @google/design.md designmd lint docs/08-DESIGN.md` → wajib **0 error dan 0 warning `contrast-ratio`**.
  - `npx -p @google/design.md designmd export --format css-tailwind|json-tailwind|dtcg docs/08-DESIGN.md` → theme untuk kode.
  - `npx -p @google/design.md designmd diff lama.md baru.md` → cek regresi setelah token diubah.
- Setiap warna teks dipasangkan ke latarnya lewat `components` (`backgroundColor` + `textColor`), supaya `lint` bisa memeriksa kontrasnya dan tidak ada token yatim.

## Prinsip UX (wajib, berlaku di atas referensi)

Referensi menentukan **gaya**; prinsip ini menentukan **kualitas**. Desain harus membuat produk mudah dipahami, dipercaya, dan dipakai, bukan sekadar cantik. Berlaku untuk semua jenis produk (e-commerce, dashboard, SaaS, mobile).

1. **Desain untuk sistem, bukan satu layar.** Komponen harus tetap rapi untuk semua variasi konten: gambar terang/gelap/ramai, teks pendek/panjang, data kosong/sedikit/banyak. Elemen di atas gambar (ikon, teks) diberi latar halus + kontras cukup agar terbaca di latar apa pun.
2. **Konsistensi.** Satu grid dan margin yang sama di seluruh layar. Satu keluarga font; hierarki dibuat dengan ukuran, ketebalan, warna, dan line-height. Satu gaya ikon (semua outline atau semua filled, ketebalan sama). Satu gaya gambar/ilustrasi untuk seluruh katalog.
3. **Hierarki & warna.** Palet mendukung konten, bukan bersaing dengannya; warna aksen hanya untuk hal terpenting. Judul menarik perhatian tanpa "berteriak"; paragraf mendukung pemahaman (line-height lebih longgar, kontras sedikit lebih rendah, tetap lolos AA).
4. **Informasi di titik keputusan.** Sinyal kepercayaan (rating, health score, status, bukti) diletakkan dekat judul/objeknya. Angka penting (harga, total, risiko) terlihat sejak awal. Kontrol yang dipakai bersama diletakkan berdampingan (mis. pemilih jumlah di sebelah tombol aksi).
5. **Hilangkan ketidakpastian sebelum aksi.** Tunjukkan konsekuensi di dalam/di dekat tombol (mis. "Bayar Rp150.000", "Kirim ke 3 kontak").
6. **Kurangi hambatan.** Aksi utama selalu terjangkau (area aksi menempel saat scroll), konteks tetap terlihat (judul menempel saat scroll), sediakan pilihan siap pakai dari data pemakaian nyata dengan tetap menyediakan input manual.
7. **Hapus yang berlebihan.** Label yang sudah jelas dari konteks dihapus (kalau satu elemen dilabeli, elemen sejenis juga harus dilabeli). Badge dan label singkat dan cepat dipindai. Judul tidak memuat info yang bisa berubah lewat kontrol lain.
8. **Detail yang terasa premium.** Divider halus, bukan tebal/gelap. Spacing menyatakan hubungan antar elemen (yang berkaitan dirapatkan), bukan sekadar ruang kosong. Label kecil kapital diberi sedikit letter-spacing.
9. **Tombol aksi utama paling jelas, tapi tidak agresif.** Hindari huruf kapital semua + ukuran berlebihan; cukup kontras, ukuran, dan posisi.

## Standar responsif (wajib, kecuali PRD/referensi menetapkan lain secara eksplisit)

Aturan pasti, bukan saran. Tulis ke bagian "Layout" 08-DESIGN dan uji di setiap breakpoint.

| Breakpoint | Lebar | Grid | Navigasi |
|---|---|---|---|
| Mobile | < 768px | 1 kolom, gutter samping 16px | **Burger** 44×44 di header; menu pindah ke **drawer** |
| Tablet | 768–1199px | 2 kolom | Burger + drawer bila menu tidak muat satu baris di header |
| Desktop | ≥ 1200px | 12 kolom, max-width konten ditetapkan (mis. 1280px), di tengah | Navigasi penuh (tab/rail) terlihat |

- **Drawer:** masuk dari samping (lebar ≤ 85vw) di atas scrim redup; tutup lewat scrim, tombol close, `Esc`, atau memilih item. Burger memakai `aria-expanded` + `aria-controls`; fokus pindah ke dalam drawer saat dibuka, terkunci di dalamnya (Tab berputar), dan kembali ke burger saat ditutup; scroll halaman terkunci selama terbuka. Drawer otomatis tertutup bila layar melebar ke desktop.
- **Header:** sticky; di mobile, teks panjang dipendekkan dan aksi sekunder (mis. pencarian) pindah ke drawer.
- **Urutan konten mobile:** mengikuti urutan baca/tugas dari PRD, bukan urutan kolom desktop.
- **Target sentuh:** ≥ 44×44px di bawah 1200px; ≥ 36px di desktop (pointer).
- **Teks:** body ≥ 16px di mobile; tidak ada scroll horizontal di 360px.
- **Verifikasi:** screenshot 375, 768, 1440 + uji drawer (buka, Esc, fokus kembali) + cek otomatis tidak ada target < 44px dan tidak ada overflow horizontal di mobile.

## Langkah 1 — Pahami docs

- Kalau projek belum di-onboard (tidak ada ringkasan di `CLAUDE.md`/`AGENTS.md`), baca semua file di `docs/` (00–08 yang ada) penuh dulu (seperti skill `project-onboard`).
- Kalau sudah, cukup baca: `01-PRD` (persona, platform, fitur → daftar layar), `02-AGENT` (struktur folder, bahasa UI), `03-ARCHITECTURE` (framework UI, styling: Tailwind/CSS Modules/shadcn/dll.).
- Susun **daftar layar & komponen** yang dibutuhkan dari fitur MVP. Ini yang nanti wajib dicakup DESIGN.md.
- Kalau `docs/` tidak ada, tawarkan skill `project-setup` dulu. Kalau user tetap mau lanjut, tanya konteks minimal (aplikasi apa, untuk siapa, platform, stack UI).

## Langkah 2 — Minta referensi

Tanya dalam satu putaran (pakai alat pertanyaan pilihan bila ada, mis. `AskUserQuestion`; kalau tidak, pilihan bernomor di chat):
1. **Referensi** (1–5, makin banyak makin akurat): screenshot/gambar (tempel atau path file), URL website/app, link Figma, Dribbble/Behance. **Tidak punya referensi?** Tawarkan DESIGN.md siap pakai dari katalog yang mengikuti spec Google (mis. getdesign.md, designmd.co) sesuai jenis produk — tetap verifikasi nilainya di website aslinya, dan ambil hanya token serta bagian yang relevan, jangan salin seluruh file.
2. **Dari tiap referensi mau ambil apa?** warna · tipografi · layout · bentuk komponen · ilustrasi/ikon · "feel" keseluruhan. Ini penting kalau referensinya lebih dari satu.
3. **Aset brand yang sudah ada:** logo, warna brand, font berlisensi.
4. **Yang tidak disukai / dihindari.**
5. **Mode:** light saja / dark saja / keduanya.

Kalau referensinya cuma satu screenshot satu layar, bilang bahwa layar lain akan diturunkan dari pola yang ada, dan minta tambahan referensi kalau user mau akurasi lebih tinggi.

## Langkah 3 — Analisis tiap referensi

Lakukan sesuai jenisnya, lalu simpan hasil mentah di `docs/design/refs/` (screenshot + `ref-N.md` berisi angka hasil ekstraksi):

- **URL**: buka di browser. Screenshot di desktop (1440) dan mobile (375). Jalankan `scripts/extract_styles.js` lewat tool JavaScript browser untuk dapat warna, font, skala teks, radius, shadow, spacing, max-width, dan CSS variables. Cek juga elemen kunci (tombol, input, kartu, navbar) satu per satu, termasuk state hover/focus kalau bisa.
- **Gambar**: jalankan `python scripts/extract_colors.py <gambar> 12` untuk palet asli. Lalu baca gambarnya dan perbesar (zoom) bagian-bagian penting untuk mengukur ukuran font, tinggi tombol, radius, jarak antar elemen, dan grid relatif terhadap lebar gambar. Font: identifikasi dari bentuk huruf. Kalau ragu, beri 2–3 kandidat dan pastikan di Langkah 6.
- **Figma**: kalau MCP Figma tersambung, pakai `get_variable_defs`, `get_design_context`, dan `get_screenshot`. Kalau belum tersambung, minta user export screenshot.

Hasil analisis per referensi (tunjukkan ke user dalam bentuk tabel):
| Aspek | Nilai | Sumber | Keyakinan |
|---|---|---|---|
| Primary | `#6366f1` | piksel / computed | pasti |
| Body font | Inter 15/24 400 | computed | pasti |
| Card radius | ~12px | estimasi screenshot | perkiraan |

Tambahkan juga ciri khas yang tidak berupa angka: kepadatan layout, gaya ikon (outline/filled, ketebalan garis), gaya ilustrasi/foto, penggunaan border vs shadow, nada visual.

**Audit UX referensi:** referensi juga bisa punya kesalahan. Periksa terhadap Prinsip UX 1–9 dan catat pelanggarannya (mis. "ikon navigasi tidak terbaca di foto terang", "rating jauh dari judul", "3 gaya ikon berbeda"). Gaya referensi tetap diikuti, tapi kesalahannya **tidak ikut disalin**.

## Langkah 4 — Sintesis sesuai kebutuhan projek

- Gabungkan referensi berdasarkan pilihan di Langkah 2 (mis. warna dari A, tipografi dari B). Kalau ada konflik, pilih yang paling sesuai persona di PRD dan sebutkan alasannya.
- Bentuk jadi **token YAML** sesuai template: `colors` semantik (primary, on-primary, secondary, neutral, surface, on-surface, on-surface-muted, outline, success, warning, danger, focus-ring; dark mode pakai awalan `dark-`), `typography` (7–15 level), `rounded`, `spacing` (basis 4/8), dan `components` yang memasangkan setiap teks dengan latarnya. Shadow, breakpoint, grid, ikon, dan motion ditulis di prosa (Elevation & Depth, Layout, Shapes, Components) karena spec belum punya tokennya.
- **Aksesibilitas**: target WCAG AA (4.5:1 teks normal, 3:1 teks besar dan elemen UI). Dicek oleh `lint`, bukan dihitung manual. Kalau warna referensi gagal, pertahankan warnanya untuk dekorasi dan buat varian terdekat yang lolos untuk teks. Catat penyimpangan ini.
- **Terapkan Prinsip UX 1–9** ke token, komponen, dan pola layar. Alasan sah untuk menyimpang dari referensi hanya dua: aksesibilitas dan pelanggaran Prinsip UX yang ditemukan di audit. Semua penyimpangan dicatat di bagian "Deviations from Reference" beserta prinsip yang dilanggar referensi.
- Turunkan **spesifikasi komponen** untuk semua komponen di daftar Langkah 1, lengkap dengan state (default, hover, active, focus, disabled, loading, error).
- Turunkan **pola layout** per layar utama dari PRD.
- Petakan ke stack di 03-ARCHITECTURE: Tailwind v4 → `export --format css-tailwind`, Tailwind v3 → `json-tailwind`, tools lain → `dtcg`. Tulis perintahnya di bagian "Implementation".
- Tulis draf `docs/08-DESIGN.md` lalu jalankan `lint`. Perbaiki sampai 0 error dan tidak ada warning `contrast-ratio`; warning lain dijelaskan atau diperbaiki.

## Langkah 5 — Preview

Buat `docs/design/preview.html` (satu file, tanpa build), dengan CSS variables dari `export --format css-tailwind` (bukan ditulis tangan): swatch warna, skala tipografi, tombol/input/kartu/nav dengan semua state, plus **satu layar nyata dari PRD** yang dirender dengan gaya ini dan menerapkan Prinsip UX (hierarki, info di titik keputusan, aksi utama yang jelas). Isi layar contoh dengan variasi konten yang menantang (teks panjang, data kosong, gambar terang) untuk menguji prinsip 1. Font diambil dari Google Fonts bila tersedia.

## Langkah 6 — Bandingkan & iterasi sampai ≥95%

1. Buka preview di browser. Screenshot di ukuran yang sama dengan referensi. Letakkan berdampingan dengan referensi (baca kedua gambar).
2. Nilai tiap aspek 0–100 dengan jujur:

| Aspek | Bobot |
|---|---|
| Warna (hue, porsi, kontras) | 20 |
| Tipografi (font, skala, weight, line-height) | 20 |
| Spacing & kepadatan | 15 |
| Bentuk komponen (radius, border, tinggi) | 15 |
| Elevasi (shadow / border) | 10 |
| Layout & grid | 10 |
| Ikon, gambar & nuansa keseluruhan | 10 |

3. **Audit UX (terpisah dari skor kemiripan, wajib lulus semua):** cek preview terhadap Prinsip UX 1–9, tulis ✅/❌ per prinsip dengan bukti singkat. Satu ❌ saja → perbaiki dulu, walaupun skor kemiripan sudah ≥95. Kemiripan tidak boleh dicapai dengan menyalin kesalahan referensi.
4. Skor < 95 → sebutkan selisih spesifiknya (mis. "radius kartu preview 8px, referensi ~14px"), perbaiki token di YAML, jalankan ulang `lint` + `export`, render ulang, nilai lagi. Kalau aspek yang dibutuhkan projek tidak ada di referensi (mis. referensi tidak punya tabel), aspek itu tidak dihitung ke skor; tandai sebagai "diturunkan".
5. Tunjukkan ke user: screenshot preview, tabel skor, hasil audit UX, dan daftar penyimpangan yang disengaja (aksesibilitas, Prinsip UX, kebutuhan PRD). Tanya: "Sudah mirip? Ada yang mau diubah?" Ulangi sampai user **ACC**.

## Langkah 7 — Tulis & sambungkan

1. Finalisasi `docs/08-DESIGN.md` dari `templates/08-DESIGN.md`. Isi semua placeholder; jangan ada yang kosong. Hapus token atau komponen template yang tidak dipakai projek (atau catat di `omitted`). Jalankan `lint` terakhir dan tulis hasilnya di baris Status.
2. Tambahkan baris ini ke bagian "Kapan baca docs" di `CLAUDE.md` dan `AGENTS.md`:
   `- Kerja UI (halaman, komponen, warna, font) → docs/08-DESIGN.md (wajib, jangan pakai nilai di luar token)`
3. Tanya user apakah mau menambah task "Implementasi design tokens & komponen dasar" ke `03-ARCHITECTURE` dan `04-TODO`. Tambahkan hanya kalau user setuju.
4. Laporkan: file yang dibuat, skor akhir per aspek, hasil audit UX, hasil `lint`, penyimpangan yang disengaja, dan langkah berikutnya.
