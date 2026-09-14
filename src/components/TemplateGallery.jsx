import { TPLS } from '../data/templates.js';

export default function TemplateGallery({ onPick }) {
  return (
    <div className="gallery">
      <header className="gallery-header">
        <div className="gallery-brand">
          <div className="header-logomark">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="#fff" strokeWidth="1.4" />
              <path d="M2 11.5h16" stroke="#fff" strokeWidth="1.4" />
              <path d="M5 14.5h10M7 17h6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity=".6" />
              <rect x="3.5" y="4.5" width="5" height="5.5" rx="0.8" fill="rgba(255,255,255,0.25)" />
            </svg>
          </div>
          <div className="header-title">Graphics Studio</div>
          <span className="header-sep">|</span>
          <div className="header-sub">Times of India · Broadcast Graphics Editor</div>
        </div>
      </header>

      <div className="gallery-body">
        <div className="gallery-intro">
          <h1>Choose a template</h1>
          <p>Start with a style and customise every detail in the editor.</p>
        </div>

        <div className="gallery-grid">
          {TPLS.map((t) => {
            const m = t.mini;
            const badgeHtml = m.bb ? (
              <div className="mini-badge" style={{ background: m.bb, color: m.bt }}>
                {t.badge.type === 'LIVE' && <div className="mini-dot" style={{ background: 'rgba(255,255,255,0.8)' }}></div>}
                {m.badge}
              </div>
            ) : null;
            return (
              <button key={t.id} className="gallery-card" onClick={() => onPick(t.id)}>
                <div className="tpl-preview-bg gallery-preview-bg">
                  <div className="mini-ticker" style={{ background: m.bg, borderTop: m.border || 'none' }}>
                    {badgeHtml}
                    <div className="mini-text" style={{ color: m.tc, fontFamily: t.text.fontFamily, fontWeight: t.text.fontWeight }}>
                      Breaking news from India <span className="mini-sep" style={{ color: m.tc }}>◆</span> Markets hit record high
                    </div>
                  </div>
                </div>
                <div className="tpl-meta">
                  <div className="tpl-meta-info">
                    <div className="tpl-name">{t.name}</div>
                    <div className="tpl-desc">{t.desc}</div>
                  </div>
                </div>
              </button>
            );
          })}

          <button className="gallery-card gallery-scratch" onClick={() => onPick('scratch')}>
            <div className="tpl-scratch-preview gallery-preview-bg">
              <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Start from scratch
            </div>
            <div className="tpl-meta">
              <div className="tpl-meta-info">
                <div className="tpl-name">Custom</div>
                <div className="tpl-desc">Fully custom ticker</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
