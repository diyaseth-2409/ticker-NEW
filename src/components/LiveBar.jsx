import { SPEEDS } from '../data/templates.js';

function badgeLabel(badge) {
  if (badge.type === 'CUSTOM') return badge.customText || 'CUSTOM';
  return badge.type;
}

export default function LiveBar({ st }) {
  const { style: s, badge: b, text: tx, behavior } = st;
  const items = st.items.filter((x) => x.trim());
  const sp = SPEEDS[behavior.speed] || SPEEDS[2];
  const iterCount = behavior.mode === 'loop' ? 'infinite' : 1;

  const itemStyle = {
    fontFamily: tx.fontFamily,
    fontSize: tx.fontSize,
    fontWeight: tx.fontWeight,
    letterSpacing: tx.letterSpacing,
    textTransform: tx.textTransform,
    color: s.textColor,
  };

  return (
    <div className="live-bar">
      <div className="live-meta">
        <div className="live-dot"></div>
        <span className="live-meta-text">Live Preview</span>
      </div>
      <div className="live-ticker-widget" id="liveWidget" style={{ background: s.bgGradient || s.bgColor }}>
        {b.show && (
          <div className="live-badge" style={{ background: b.bgColor, color: b.textColor, fontWeight: b.fontWeight }}>
            {b.type === 'LIVE' && <div className="live-badge-dot" style={{ background: b.textColor }}></div>}
            <span>{badgeLabel(b)}</span>
          </div>
        )}
        <div className="live-track" style={{ '--fade': s.bgGradient ? 'rgba(0,0,0,0)' : s.bgColor }}>
          <div
            className="live-inner"
            id="liveInner"
            style={{ animationDuration: sp.lDur + 'ms', animationIterationCount: iterCount }}
          >
            {[0, 1].map((rep) => (
              <span key={rep}>
                {items.map((x, i) => (
                  <span key={i}>
                    <span className="live-item" style={itemStyle}>{x}</span>
                    <span className="live-sep" style={{ color: s.separatorColor }}>◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
