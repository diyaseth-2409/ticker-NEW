import { useEffect, useState } from 'react';
import { isHex, isSafeColor } from '../utils.js';

export default function ColorField({ value, fallback, onChange }) {
  const swatchHex = isSafeColor(value) ? value : fallback;
  const [text, setText] = useState(value);

  useEffect(() => setText(value), [value]);

  return (
    <div className="color-field">
      <div className="swatch-wrap">
        <input type="color" value={swatchHex} onChange={(e) => onChange(e.target.value)} />
        <div className="swatch-vis" style={{ background: swatchHex }}></div>
      </div>
      <input
        className="hex-inp"
        maxLength={7}
        value={text}
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          if (isHex(v)) onChange(v);
        }}
      />
    </div>
  );
}
