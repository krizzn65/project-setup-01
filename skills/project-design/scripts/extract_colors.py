"""Ambil palet warna dominan dari screenshot referensi (nilai hex dari piksel asli, bukan tebakan).

Pakai: python extract_colors.py gambar.png [jumlah_warna=12]
"""
import sys
from PIL import Image

path = sys.argv[1]
n = int(sys.argv[2]) if len(sys.argv) > 2 else 12

img = Image.open(path).convert("RGB")
img.thumbnail((800, 800))
q = img.quantize(colors=n, method=Image.Quantize.MEDIANCUT)
palette = q.getpalette()
total = img.width * img.height

print(f"{'hex':<9}{'porsi':>7}  luminance")
for count, idx in sorted(q.getcolors(), reverse=True):
    r, g, b = palette[idx * 3: idx * 3 + 3]
    lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    print(f"#{r:02x}{g:02x}{b:02x}  {count / total:6.1%}  {lum:5.0f}")
