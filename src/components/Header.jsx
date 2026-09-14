export default function Header({ onSave, saved, onBack }) {
  return (
    <header className="header">
      <div className="header-brand">
        {onBack && (
          <button className="btn btn-ghost" onClick={onBack} style={{ padding: '0 9px' }} title="Back to templates">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
        )}
        <div className="header-logomark">
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="#fff" strokeWidth="1.4" />
            <path d="M2 11.5h16" stroke="#fff" strokeWidth="1.4" />
            <path d="M5 14.5h10M7 17h6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity=".6" />
            <rect x="3.5" y="4.5" width="5" height="5.5" rx="0.8" fill="rgba(255,255,255,0.25)" />
          </svg>
        </div>
        <div>
          <div className="header-title">Graphics Studio</div>
        </div>
        <span className="header-sep">|</span>
        <div className="header-sub">Times of India · Broadcast Graphics Editor</div>
        <div className="header-chip">BETA</div>
      </div>
      <div className="header-actions">
        <button className="btn btn-ghost" id="btnPlayer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          Preview in Player
        </button>
        <button className="btn btn-primary" id="btnSave" onClick={onSave} style={saved ? { background: '#15803D' } : undefined}>
          {saved ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
          )}
          {saved ? 'Saved!' : 'Save Ticker'}
        </button>
      </div>
    </header>
  );
}
