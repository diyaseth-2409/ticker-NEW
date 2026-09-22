const COPY = {
  widgets: { title: 'Widgets', desc: 'Clocks, scoreboards, polls, and other on-screen widgets.' },
  captions: { title: 'Captions', desc: 'Lower-third captions and speaker name straps.' },
  jackets: { title: 'Jackets', desc: 'Full-frame story jackets and title cards.' },
};

export default function ComingSoonPanel({ category }) {
  const copy = COPY[category] || { title: category, desc: '' };
  return (
    <div className="coming-soon">
      <div className="coming-soon-badge">Coming soon</div>
      <h2>{copy.title}</h2>
      <p>{copy.desc}</p>
    </div>
  );
}
