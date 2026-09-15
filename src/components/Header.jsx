import { useState } from 'react';
import { playerUrl } from '../utils.js';

export default function Header({ st, onSave, saved, onBack }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = playerUrl(st);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('Copy this URL:', url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = () => {
    window.open(playerUrl(st), '_blank', 'noopener');
  };

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
      </div>
      <div className="header-actions">
        <button className="btn btn-ghost" onClick={handleCopy} title="Copy the standalone ticker URL">
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
          )}
          {copied ? 'Copied!' : 'Copy URL'}
        </button>
        <button className="btn btn-ghost" onClick={handleOpen} title="Open the standalone ticker in a new tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          Open URL
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
