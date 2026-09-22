// Deterministic gradient placeholder for a feed/JSON headline's dummy media
// thumbnail — same headline always renders the same placeholder art.
const THUMB_PALETTES = [
  ['#E8432B', '#6E140D'],
  ['#3B4A7A', '#131A2B'],
  ['#2E7D6B', '#0F332B'],
  ['#8A5A1B', '#3B2508'],
  ['#5B3B8A', '#241533'],
];
export const placeholderThumb = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const [from, to] = THUMB_PALETTES[hash % THUMB_PALETTES.length];
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="360" height="640" fill="url(#g)"/><circle cx="180" cy="260" r="70" fill="rgba(255,255,255,0.18)"/><rect x="70" y="380" width="220" height="16" rx="8" fill="rgba(255,255,255,0.22)"/><rect x="100" y="410" width="160" height="12" rx="6" fill="rgba(255,255,255,0.16)"/></svg>`
  );
};

// Unicode-safe base64 encode/decode, used to pack ticker state into a URL.
export const encodeState = (obj) => {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodeState = (str) => {
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
};

export const playerUrl = (st, kind = 'ticker') => {
  const url = new URL(window.location.href);
  url.hash = '/player?kind=' + kind + '&data=' + encodeState(st);
  return url.toString();
};

export const isHex = (v) => /^#[0-9A-Fa-f]{6}$/.test(v);
export const isRgba = (v) => /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(v);
export const isSafeColor = (v) => !v.startsWith('linear-gradient') && (isHex(v) || isRgba(v));

// Parse any supported color string to {r,g,b,a} (a in 0-1). Falls back to opaque black.
export const parseColor = (v) => {
  if (isHex(v)) {
    return {
      r: parseInt(v.slice(1, 3), 16),
      g: parseInt(v.slice(3, 5), 16),
      b: parseInt(v.slice(5, 7), 16),
      a: 1,
    };
  }
  const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(v || '');
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
  return { r: 0, g: 0, b: 0, a: 1 };
};

export const toHex2 = (n) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
export const rgbToHex = ({ r, g, b }) => `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`.toUpperCase();

// Serialize {r,g,b,a} back to a CSS color string — hex when fully opaque, rgba otherwise.
export const colorToCss = ({ r, g, b, a }) => (a >= 1 ? rgbToHex({ r, g, b }) : `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${Math.round(a * 100) / 100})`);

export const hsvToRgb = (h, s, v) => {
  s /= 100; v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
};

export const rgbToHsv = ({ r, g, b }) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;
  return { h, s, v };
};

// Pick readable text color (light/dark) for given bg color (hex or rgba).
export const autoTextColor = (color, light = '#FFFFFF', dark = '#1A1714') => {
  if (!color || !isSafeColor(color)) return dark;
  const { r, g, b } = parseColor(color);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? dark : light;
};
