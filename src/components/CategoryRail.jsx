const CATEGORIES = [
  {
    id: 'ticker',
    label: 'Ticker',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 12h18" /><path d="M6 15.5h4" />
      </svg>
    ),
  },
  {
    id: 'widgets',
    label: 'Widgets',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.3" /><rect x="14" y="3" width="7" height="7" rx="1.3" />
        <rect x="3" y="14" width="7" height="7" rx="1.3" /><rect x="14" y="14" width="7" height="7" rx="1.3" />
      </svg>
    ),
  },
  {
    id: 'captions',
    label: 'Captions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 10h3M7 14h7" />
      </svg>
    ),
  },
  {
    id: 'jackets',
    label: 'Jackets',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V9l4-4h8l4 4v12" /><path d="M4 9h16" /><path d="M9 5v4M15 5v4" />
      </svg>
    ),
  },
];

export default function CategoryRail({ active, onSelect }) {
  return (
    <nav className="cat-rail">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          className={'cat-rail-item' + (active === c.id ? ' active' : '')}
          onClick={() => onSelect(c.id)}
        >
          <span className="cat-rail-icon">{c.icon}</span>
          <span className="cat-rail-label">{c.label}</span>
        </button>
      ))}
    </nav>
  );
}
