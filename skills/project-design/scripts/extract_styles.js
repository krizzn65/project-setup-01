// Jalankan di halaman website referensi (tool javascript browser) untuk mengambil design token asli
// dari computed style. Hasil: warna, font, ukuran teks, radius, shadow, spacing, lebar container,
// beserta frekuensinya. Hanya membaca, tidak mengubah halaman.
(() => {
  const tally = {};
  const add = (key, value) => {
    if (!value || value === 'none' || value === 'normal' || value === 'rgba(0, 0, 0, 0)' || value === '0px') return;
    (tally[key] ??= {})[value] = (tally[key][value] ?? 0) + 1;
  };
  const els = [...document.querySelectorAll('body *')].filter(el => el.getClientRects().length);
  for (const el of els) {
    const s = getComputedStyle(el);
    add('text', s.color);
    add('background', s.backgroundColor);
    add('border', s.borderTopWidth !== '0px' ? s.borderTopColor : null);
    add('font', s.fontFamily);
    add('size/weight/line', `${s.fontSize} / ${s.fontWeight} / ${s.lineHeight}`);
    add('letterSpacing', s.letterSpacing);
    add('radius', s.borderRadius);
    add('shadow', s.boxShadow);
    add('padding', s.padding);
    add('gap', s.gap);
    if (s.maxWidth !== 'none') add('maxWidth', s.maxWidth);
  }
  const top = (key, n = 12) => Object.entries(tally[key] ?? {}).sort((a, b) => b[1] - a[1]).slice(0, n);
  const rootVars = [...document.styleSheets].flatMap(sheet => {
    try { return [...sheet.cssRules]; } catch { return []; }
  }).filter(r => r.selectorText === ':root').flatMap(r => [...r.style].filter(p => p.startsWith('--')).map(p => `${p}: ${r.style.getPropertyValue(p).trim()}`));
  const sample = sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const s = getComputedStyle(el);
    return { font: `${s.fontSize}/${s.lineHeight} ${s.fontWeight}`, color: s.color, bg: s.backgroundColor, radius: s.borderRadius, padding: s.padding, shadow: s.boxShadow };
  };
  return {
    url: location.href,
    viewport: `${innerWidth}x${innerHeight}`,
    html: sample('html'),
    body: sample('body'),
    h1: sample('h1'), h2: sample('h2'), h3: sample('h3'), p: sample('p'),
    button: sample('button, [role=button], a[class*=btn], a[class*=button]'),
    input: sample('input:not([type=hidden]), textarea'),
    nav: sample('nav, header'),
    cssVariables: rootVars.slice(0, 80),
    ...Object.fromEntries(Object.keys(tally).map(k => [k, top(k)])),
  };
})()
