import { useEffect, useRef, useState } from 'react';

// Small 3-dot overflow menu for a gallery/home card — currently just
// "Duplicate", opening the editor pre-loaded with a copy of the template.
export default function CardMenu({ onDuplicate, onOpenChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const setOpenAndNotify = (v) => {
    setOpen(v);
    if (onOpenChange) onOpenChange(v);
  };

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenAndNotify(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpenAndNotify(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="card-menu" ref={wrapRef} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className="card-menu-trigger"
        aria-label="Card options"
        onClick={() => setOpenAndNotify(!open)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" /></svg>
      </button>
      {open && (
        <div className="card-menu-pop" role="menu">
          <button
            type="button"
            className="card-menu-item"
            role="menuitem"
            onClick={() => { setOpenAndNotify(false); onDuplicate(); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            Duplicate
          </button>
        </div>
      )}
    </div>
  );
}
