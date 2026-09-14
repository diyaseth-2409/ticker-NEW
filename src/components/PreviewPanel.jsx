import { SPEEDS } from '../data/templates.js';
import ColorField from './ColorField.jsx';
import SingleItemTicker from './SingleItemTicker.jsx';
import { autoTextColor } from '../utils.js';

function badgeLabel(badge) {
  return badge.customText || badge.type || 'LIVE';
}

const DEV_TABS = [
  { id: 'desktop', label: 'Desktop', icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
  { id: 'tablet', label: 'Tablet', icon: <svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" /></svg> },
  { id: 'mobile', label: 'Mobile', icon: <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" /></svg> },
];

export default function PreviewPanel({ st, setSt }) {
  const { style: s, badge: b, text: tx, behavior } = st;
  const items = st.items.filter((x) => x.trim());
  const sp = SPEEDS[behavior.speed] || SPEEDS[2];
  const iterCount = behavior.mode === 'loop' ? 'infinite' : 1;

  const autoColor = autoTextColor(s.bgColor);

  const tickerStyle = {
    background: s.bgColor,
    height: s.height,
  };

  const itemStyle = {
    fontFamily: tx.fontFamily,
    fontSize: tx.fontSize,
    textTransform: tx.textTransform,
    color: autoColor,
  };

  const setDev = (d) => setSt((state) => ({ ...state, device: d }));
  const setStyle = (k, v) => setSt((state) => ({ ...state, style: { ...state.style, [k]: v } }));
  const setTx = (k, v) => setSt((state) => ({ ...state, text: { ...state.text, [k]: v } }));
  const setBadge = (k, v) => setSt((state) => ({ ...state, badge: { ...state.badge, [k]: v } }));
  const toggleBadge = () => setBadge('show', !b.show);
  const badgeAutoColor = autoTextColor(b.bgColor);

  return (
    <aside className="panel-right">
      <div className="prev-ctrl">
        <span className="prev-label">Preview</span>
        <div className="dev-tabs">
          {DEV_TABS.map((d) => (
            <button
              key={d.id}
              className={'dev-tab' + (st.device === d.id ? ' active' : '')}
              onClick={() => setDev(d.id)}
            >
              {d.icon}
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="broadcast-canvas">
        <div className={'broadcast-frame' + (st.device !== 'desktop' ? ' ' + st.device : '')} id="broadcastFrame">
            <div className="broadcast-video">
              <svg className="broadcast-wave" viewBox="0 0 100 60" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7">
                <path d="M0 30c8-11 16 11 25 0s17-11 25 0 17 11 25 0 17-11 25 0" />
                <path d="M0 38c8-11 16 11 25 0s17-11 25 0 17 11 25 0 17-11 25 0" opacity=".6" />
                <path d="M0 22c8-11 16 11 25 0s17-11 25 0 17 11 25 0 17-11 25 0" opacity=".4" />
              </svg>
            </div>
            <div className="p-ticker" id="pTicker" style={tickerStyle}>
              {b.show && (
                <div className="p-badge" style={{ background: b.bgColor, color: badgeAutoColor, fontWeight: b.fontWeight }}>
                  {b.type === 'LIVE' && <div className="p-badge-dot" style={{ background: badgeAutoColor }}></div>}
                  <span>{badgeLabel(b)}</span>
                </div>
              )}
              <div className="p-track">
                {behavior.mode === 'single' ? (
                  <SingleItemTicker
                    items={items}
                    animation={behavior.animation || 'fade'}
                    durationSec={behavior.itemDuration || 5}
                    itemStyle={itemStyle}
                  />
                ) : (
                  <div
                    className="p-inner"
                    id="pInner"
                    style={{ animationDuration: sp.pDur + 'ms', animationIterationCount: iterCount }}
                  >
                    {[0, 1].map((rep) => (
                      <span key={rep}>
                        {items.map((x, i) => (
                          <span key={i}>
                            <span className="p-item" style={itemStyle}>{x}</span>
                            <span className="p-sep" style={{ color: s.separatorColor }}>◆</span>
                          </span>
                        ))}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>

      <div className="panel-right-scroll">
        <div className="style-opts">
          <div className="style-opts-hd">
            <span className="style-opts-title">Style Options</span>
          </div>
          <div className="form-row form-row-2">
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
          </div>
        </div>

        <div className="style-opts">
          <div className="style-opts-hd">
            <span className="style-opts-title">Typography</span>
          </div>
          <div className="form-row form-row-3">
            <div className="form-g">
              <label className="form-lbl">Font Family</label>
              <select className="form-inp form-sel" value={tx.fontFamily} onChange={(e) => setTx('fontFamily', e.target.value)}>
                <option value="Inter, sans-serif">Inter</option>
                <option value="Roboto, sans-serif">Roboto</option>
                <option value="Georgia, 'Times New Roman', serif">Georgia</option>
                <option value="Merriweather, serif">Merriweather</option>
                <option value="'Courier New', Courier, monospace">Courier</option>
              </select>
            </div>
            <div className="form-g">
              <label className="form-lbl">Size</label>
              <select className="form-inp form-sel" value={tx.fontSize} onChange={(e) => setTx('fontSize', e.target.value)}>
                <option value="12px">Small</option>
                <option value="14px">Medium</option>
                <option value="16px">Large</option>
              </select>
            </div>
            <div className="form-g">
              <label className="form-lbl">Text Transform</label>
              <select className="form-inp form-sel" value={tx.textTransform} onChange={(e) => setTx('textTransform', e.target.value)}>
                <option value="none">As typed</option>
                <option value="uppercase">UPPERCASE</option>
                <option value="lowercase">lowercase</option>
                <option value="capitalize">Title Case</option>
              </select>
            </div>
          </div>
        </div>

        <div className="style-opts">
          <div className="style-opts-hd style-opts-hd-row">
            <div>
              <span className="style-opts-title">Badge</span>
            </div>
            <div className="tog-row-inline">
              <span className="tog-lbl">Show badge</span>
              <button className={'tog-sw' + (b.show ? ' on' : '')} onClick={toggleBadge} aria-label="Toggle badge"></button>
            </div>
          </div>
          <div style={{ opacity: b.show ? 1 : 0.45, pointerEvents: b.show ? 'auto' : 'none' }}>
            <div className="form-row form-row-2">
              <div className="form-g">
                <label className="form-lbl">Badge Text</label>
                <div className="badge-text-field">
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
              <div className="form-g">
                <label className="form-lbl">Background</label>
                <ColorField value={b.bgColor} fallback="#D7282F" onChange={(v) => setBadge('bgColor', v)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
