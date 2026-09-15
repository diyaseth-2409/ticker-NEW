import ColorField from './ColorField.jsx';
import TickerBehaviour from './TickerBehaviour.jsx';

// Style Options / Typography / Badge / Ticker Behaviour — flat, unboxed
// sections stacked one after another under the preview, each separated by
// a divider line instead of its own bordered card.
export default function StyleControls({ st, setSt }) {
  const { style: s, badge: b, text: tx, behavior } = st;
  // Alignment only affects a single held item — meaningless for a
  // continuous scroll, where every item just streams past left-to-right.
  const alignDisabled = behavior.mode !== 'single';
  const setStyle = (k, v) => setSt((state) => ({ ...state, style: { ...state.style, [k]: v } }));
  const setTx = (k, v) => setSt((state) => ({ ...state, text: { ...state.text, [k]: v } }));
  const setBadge = (k, v) => setSt((state) => ({ ...state, badge: { ...state.badge, [k]: v } }));
  const toggleBadge = () => setBadge('show', !b.show);

  return (
    <div className="style-controls">
      <div className="style-sec">
        <div className="form-row form-row-style-top">
          <div className="form-g">
            <label className="form-lbl">Background Colour</label>
            <ColorField value={s.bgColor} fallback="#D7282F" onChange={(v) => setStyle('bgColor', v)} />
          </div>
          <div className="form-g">
            <label className="form-lbl">Height</label>
            <select className="form-inp form-sel" value={s.height} onChange={(e) => setStyle('height', e.target.value)}>
              <option value="36px">Compact — 36px</option>
              <option value="44px">Small — 44px</option>
              <option value="48px">Standard — 48px</option>
              <option value="56px">Tall — 56px</option>
              <option value="64px">Large — 64px</option>
            </select>
          </div>
          <div className="form-g">
          <label className="form-lbl">Formatting</label>
          <div className="fmt-toolbar">
            <div className="fmt-icon-select">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fmt-icon-select-glyph">
                <path d="M4 17l3.5-9L11 17M4.8 14.5h5.4"/><path d="M13 17c1.2.6 4.5.6 4.5-1.3 0-1.6-2.2-1.6-2.2-1.6s2.6 0 2.6-1.7c0-1.7-3-1.7-4.2-1.1"/>
              </svg>
              <select
                className="fmt-icon-select-inp"
                value={tx.textTransform}
                onChange={(e) => setTx('textTransform', e.target.value)}
                title="Text case"
                aria-label="Text case"
              >
                <option value="none">As typed</option>
                <option value="uppercase">UPPERCASE</option>
                <option value="lowercase">lowercase</option>
                <option value="capitalize">Title Case</option>
              </select>
              <svg className="fmt-icon-select-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>

            <span className="fmt-divider" />

            <select className="fmt-select fmt-select-font" value={tx.fontFamily} onChange={(e) => setTx('fontFamily', e.target.value)}>
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
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
              max={72}
              value={parseInt(tx.fontSize, 10) || 14}
              onChange={(e) => setTx('fontSize', Math.min(72, Math.max(8, parseInt(e.target.value, 10) || 14)) + 'px')}
            />
            <button
              type="button"
              className="fmt-icon-btn fmt-step-btn"
              onClick={() => setTx('fontSize', Math.min(72, (parseInt(tx.fontSize, 10) || 14) + 1) + 'px')}
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="19" x2="16" y2="19"/><line x1="8" y1="5" x2="14" y2="5"/><line x1="14" y1="5" x2="10" y2="19"/></svg>
            </button>
            <button
              type="button"
              className={'fmt-icon-btn' + (tx.textDecoration === 'underline' ? ' active' : '')}
              onClick={() => setTx('textDecoration', tx.textDecoration === 'underline' ? 'none' : 'underline')}
              aria-label="Underline" aria-pressed={tx.textDecoration === 'underline'} title="Underline"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 4v7a6 6 0 0012 0V4"/><line x1="5" y1="20" x2="19" y2="20"/></svg>
            </button>

            <span className="fmt-divider" />

            <button
              type="button"
              className={'fmt-icon-btn' + (tx.textAlign === 'left' || !tx.textAlign ? ' active' : '')}
              onClick={() => setTx('textAlign', 'left')}
              disabled={alignDisabled}
              aria-label="Align left" aria-pressed={tx.textAlign === 'left' || !tx.textAlign} title={alignDisabled ? 'Alignment only applies to Sequential display mode' : 'Align left'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="17" y2="18"/></svg>
            </button>
            <button
              type="button"
              className={'fmt-icon-btn' + (tx.textAlign === 'center' ? ' active' : '')}
              onClick={() => setTx('textAlign', 'center')}
              disabled={alignDisabled}
              aria-label="Align center" aria-pressed={tx.textAlign === 'center'} title={alignDisabled ? 'Alignment only applies to Sequential display mode' : 'Align center'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="5.5" y1="18" x2="18.5" y2="18"/></svg>
            </button>
            <button
              type="button"
              className={'fmt-icon-btn' + (tx.textAlign === 'right' ? ' active' : '')}
              onClick={() => setTx('textAlign', 'right')}
              disabled={alignDisabled}
              aria-label="Align right" aria-pressed={tx.textAlign === 'right'} title={alignDisabled ? 'Alignment only applies to Sequential display mode' : 'Align right'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="7" y1="18" x2="20" y2="18"/></svg>
            </button>
          </div>
          </div>
        </div>
      </div>

      <hr className="style-sep" />

      <div className="style-sec">
        <div className={'form-row ' + (s.layout === 'double-decker' ? 'form-row-5' : 'form-row-4')}>
          <div className="form-g">
            <label className="form-lbl form-lbl-row">
              Badge Text
              <button className={'tog-sw tog-sw-sm' + (b.show ? ' on' : '')} onClick={toggleBadge} aria-label="Toggle badge"></button>
            </label>
            <div className="badge-text-field" style={{ opacity: b.show ? 1 : 0.45, pointerEvents: b.show ? 'auto' : 'none' }}>
              <input
                type="text"
                className="form-inp"
                placeholder="LIVE"
                maxLength={20}
                value={b.customText}
                onChange={(e) => setBadge('customText', e.target.value)}
              />
              <span className="badge-text-count">{b.customText.length}/20</span>
            </div>
          </div>
          <div className="form-g" style={{ opacity: b.show ? 1 : 0.45, pointerEvents: b.show ? 'auto' : 'none' }}>
            <label className="form-lbl">Background</label>
            <ColorField value={b.bgColor} fallback="#D7282F" onChange={(v) => setBadge('bgColor', v)} />
          </div>
          {s.layout === 'double-decker' ? (
            <>
              <div className="form-g" style={{ opacity: b.show ? 1 : 0.45, pointerEvents: b.show ? 'auto' : 'none' }}>
                <label className="form-lbl">Bottom Tag Text</label>
                <input
                  type="text"
                  className="form-inp"
                  placeholder="24/7"
                  maxLength={10}
                  value={b.tag2 || ''}
                  onChange={(e) => setBadge('tag2', e.target.value)}
                />
              </div>
              <div className="form-g" style={{ opacity: b.show ? 1 : 0.45, pointerEvents: b.show ? 'auto' : 'none' }}>
                <label className="form-lbl">Banner Style</label>
                <select className="form-inp form-sel" value={s.ddStyle || 'chevron'} onChange={(e) => setStyle('ddStyle', e.target.value)}>
                  <option value="chevron">Chevron — angled banner + tag</option>
                  <option value="split">Split block — solid + angled</option>
                  <option value="stripes">Diagonal stripes accent</option>
                  <option value="pill">Rounded pill tag</option>
                </select>
              </div>
            </>
          ) : (
            <div className="form-g" style={{ opacity: b.show ? 1 : 0.45, pointerEvents: b.show ? 'auto' : 'none' }}>
              <label className="form-lbl">Shape</label>
              <select className="form-inp form-sel" value={s.badgeShape || 'flat'} onChange={(e) => setStyle('badgeShape', e.target.value)}>
                <option value="flat">Flat</option>
                <option value="wedge">Wedge — angled</option>
              </select>
            </div>
          )}
          <div className="form-g" style={{ opacity: b.show ? 1 : 0.45, pointerEvents: b.show ? 'auto' : 'none' }}>
            <label className="form-lbl">Badge Size</label>
            <select className="form-inp form-sel" value={b.scale || 1} onChange={(e) => setBadge('scale', parseFloat(e.target.value))}>
              <option value={0.8}>Small</option>
              <option value={1}>Standard</option>
              <option value={1.3}>Large</option>
              <option value={1.6}>Extra Large</option>
            </select>
          </div>
        </div>
      </div>

      <hr className="style-sep" />

      <TickerBehaviour st={st} setSt={setSt} />
    </div>
  );
}
