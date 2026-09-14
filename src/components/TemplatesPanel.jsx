import { TPLS } from '../data/templates.js';

export default function TemplatesPanel({ template, onSelect }) {
  return (
    <aside className="panel-left">
      <div className="panel-hd">
        <div className="panel-hd-title">Choose a template</div>
        <div className="panel-hd-sub">Start with a style and customise it.</div>
      </div>
      <div className="tpl-list" id="tplList">
        {TPLS.map((t) => {
          const m = t.mini;
          const badgeHtml = m.bb ? (
            <div className="mini-badge" style={{ background: m.bb, color: m.bt }}>
              {t.badge.type === 'LIVE' && <div className="mini-dot" style={{ background: 'rgba(255,255,255,0.8)' }}></div>}
              {m.badge}
            </div>
          ) : null;
          return (
            <div
              key={t.id}
              className={'tpl-card' + (template === t.id ? ' selected' : '')}
              data-id={t.id}
              onClick={() => onSelect(t.id)}
            >
              <div className="tpl-preview-bg">
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
                <div className="tpl-check">
                  <svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" /></svg>
                </div>
              </div>
            </div>
          );
        })}

        <div className="tpl-divider"></div>

        <div
          className={'tpl-card tpl-scratch' + (template === 'scratch' ? ' selected' : '')}
          data-id="scratch"
          onClick={() => onSelect('scratch')}
        >
          <div className="tpl-scratch-preview">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Start from scratch
          </div>
          <div className="tpl-meta">
            <div className="tpl-meta-info">
              <div className="tpl-name">Custom</div>
              <div className="tpl-desc">Fully custom ticker</div>
            </div>
            <div className="tpl-check">
              <svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" /></svg>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
