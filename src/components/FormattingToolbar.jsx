// Reusable font formatting toolbar (font family, size, bold/italic/underline,
// alignment) — same control set as the ticker's Style Options Formatting row,
// driving a `tx`-shaped style object instead of the ticker's text style.
export default function FormattingToolbar({ tx, setTx }) {
  return (
    <div className="fmt-toolbar">
      <select className="fmt-select fmt-select-font" value={tx.fontFamily} onChange={(e) => setTx('fontFamily', e.target.value)}>
        <option value="Inter, sans-serif">Inter</option>
        <option value="Roboto, sans-serif">Roboto</option>
        <option value="'Playfair Display', Georgia, serif">Playfair Display</option>
        <option value="Georgia, 'Times New Roman', serif">Georgia</option>
        <option value="Merriweather, serif">Merriweather</option>
        <option value="'Courier New', Courier, monospace">Courier</option>
      </select>

      <span className="fmt-divider" />

      <button
        type="button"
        className="fmt-icon-btn fmt-step-btn"
        onClick={() => setTx('fontSize', Math.max(8, (parseInt(tx.fontSize, 10) || 14) - 1) + 'px')}
        aria-label="Decrease font size" title="Decrease font size"
      >−</button>
      <input
        type="number"
        className="fmt-size-inp"
        min={8}
        max={96}
        value={parseInt(tx.fontSize, 10) || 14}
        onChange={(e) => setTx('fontSize', Math.min(96, Math.max(8, parseInt(e.target.value, 10) || 14)) + 'px')}
      />
      <button
        type="button"
        className="fmt-icon-btn fmt-step-btn"
        onClick={() => setTx('fontSize', Math.min(96, (parseInt(tx.fontSize, 10) || 14) + 1) + 'px')}
        aria-label="Increase font size" title="Increase font size"
      >+</button>

      <span className="fmt-divider" />

      <button
        type="button"
        className={'fmt-icon-btn' + (parseInt(tx.fontWeight, 10) >= 700 ? ' active' : '')}
        onClick={() => setTx('fontWeight', parseInt(tx.fontWeight, 10) >= 700 ? '500' : '700')}
        aria-label="Bold" aria-pressed={parseInt(tx.fontWeight, 10) >= 700} title="Bold"
        style={{ fontWeight: 800, fontSize: 15 }}
      >B</button>
      <button
        type="button"
        className={'fmt-icon-btn' + (tx.fontStyle === 'italic' ? ' active' : '')}
        onClick={() => setTx('fontStyle', tx.fontStyle === 'italic' ? 'normal' : 'italic')}
        aria-label="Italic" aria-pressed={tx.fontStyle === 'italic'} title="Italic"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="19" x2="16" y2="19" /><line x1="8" y1="5" x2="14" y2="5" /><line x1="14" y1="5" x2="10" y2="19" /></svg>
      </button>
      <button
        type="button"
        className={'fmt-icon-btn' + (tx.textDecoration === 'underline' ? ' active' : '')}
        onClick={() => setTx('textDecoration', tx.textDecoration === 'underline' ? 'none' : 'underline')}
        aria-label="Underline" aria-pressed={tx.textDecoration === 'underline'} title="Underline"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 4v7a6 6 0 0012 0V4" /><line x1="5" y1="20" x2="19" y2="20" /></svg>
      </button>

      <span className="fmt-divider" />

      <button
        type="button"
        className={'fmt-icon-btn' + (tx.textAlign === 'left' || !tx.textAlign ? ' active' : '')}
        onClick={() => setTx('textAlign', 'left')}
        aria-label="Align left" aria-pressed={tx.textAlign === 'left' || !tx.textAlign} title="Align left"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="17" y2="18" /></svg>
      </button>
      <button
        type="button"
        className={'fmt-icon-btn' + (tx.textAlign === 'center' ? ' active' : '')}
        onClick={() => setTx('textAlign', 'center')}
        aria-label="Align center" aria-pressed={tx.textAlign === 'center'} title="Align center"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="5.5" y1="18" x2="18.5" y2="18" /></svg>
      </button>
      <button
        type="button"
        className={'fmt-icon-btn' + (tx.textAlign === 'right' ? ' active' : '')}
        onClick={() => setTx('textAlign', 'right')}
        aria-label="Align right" aria-pressed={tx.textAlign === 'right'} title="Align right"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="10" y1="12" x2="20" y2="12" /><line x1="7" y1="18" x2="20" y2="18" /></svg>
      </button>
    </div>
  );
}
