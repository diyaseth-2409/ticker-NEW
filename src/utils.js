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

export const playerUrl = (st) => {
  const url = new URL(window.location.href);
  url.hash = '/player?data=' + encodeState(st);
  return url.toString();
};

export const isHex = (v) => /^#[0-9A-Fa-f]{6}$/.test(v);
export const isSafeColor = (v) => !v.startsWith('rgba') && !v.startsWith('linear-gradient') && isHex(v);

// Pick readable text color (light/dark) for given bg hex.
export const autoTextColor = (hex, light = '#FFFFFF', dark = '#1A1714') => {
  if (!isHex(hex)) return dark;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? dark : light;
};
