import { WIDGET_TPLS } from '../data/widgetTemplates.js';
import { autoTextColor } from '../utils.js';

// Preset grid for the Heading + List widget, rendered inside TemplateGallery's
// body slot for the "widgets" category (same header + CategoryRail shell).
export default function WidgetGallery({ onPick }) {
  return (
    <div className="gallery-body">
      <div className="gallery-intro">
        <h1>Choose a widget style</h1>
      </div>

      <div className="gallery-grid">
        <button className="gallery-card gallery-scratch" onClick={() => onPick('crimson-dots')}>
          <div className="tpl-scratch-preview tpl-scratch-preview-16x9 gallery-preview-bg">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Start from scratch
          </div>
        </button>

        {WIDGET_TPLS.map((t) => {
          const bodyTextColor = autoTextColor(t.style.bg);
          const headingTextColor = autoTextColor(t.style.headingBg);
          return (
            <button key={t.id} className="gallery-card" onClick={() => onPick(t.id)}>
              <div className="widget-mini" style={{ background: t.style.bgGradient || t.style.bg }}>
                <div className={'widget-texture-' + (t.style.texture || 'none')} style={{ opacity: t.style.textureOpacity ?? 1 }} />
                <div className="widget-mini-heading" style={{ background: t.style.headingBgGradient || t.style.headingBg, color: headingTextColor }}>
                  News Heading
                </div>
                <div className={'widget-mini-body' + (t.style.badgeImagePos ? ' widget-mini-body-badge-' + t.style.badgeImagePos : '')}>
                  <span className="widget-mini-desc" style={{ color: bodyTextColor }}>Enter description here</span>
                  {t.style.badgeImagePos && (
                    <div className={'widget-mini-badge-img widget-mini-badge-img-placeholder widget-mini-badge-img-' + t.style.badgeImagePos}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.2" /><path d="M6 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /></svg>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
