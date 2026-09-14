import { useEffect, useRef, useState } from 'react';

// Cycles through items one at a time, holding each for `durationSec`,
// transitioning between them with the chosen `animation`. Stops after the last item.
export default function SingleItemTicker({ items, animation, durationSec, itemStyle, className }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('in'); // 'in' | 'hold' | 'out'
  const key = items.join('|');
  const safeIndex = items.length ? Math.min(index, items.length - 1) : 0;

  // Reset to the first item whenever the item list, animation, or duration changes.
  useEffect(() => {
    setIndex(0);
    setPhase('in');
  }, [key, animation, durationSec]);

  useEffect(() => {
    if (items.length === 0) return undefined;

    const holdMs = Math.max(1, durationSec) * 1000;
    const transMs = 420;
    const timers = [];

    setPhase('in');
    timers.push(setTimeout(() => setPhase('hold'), 30));

    if (safeIndex < items.length - 1) {
      timers.push(setTimeout(() => setPhase('out'), holdMs));
      timers.push(setTimeout(() => setIndex((i) => Math.min(i + 1, items.length - 1)), holdMs + transMs));
    }

    return () => timers.forEach(clearTimeout);
  }, [safeIndex, key, durationSec]);

  if (items.length === 0) return null;

  const cls = `single-item anim-${animation} phase-${phase}${className ? ' ' + className : ''}`;

  return (
    <div className="single-item-wrap">
      <span key={safeIndex} className={cls} style={itemStyle}>{items[safeIndex]}</span>
    </div>
  );
}
