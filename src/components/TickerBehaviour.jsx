const ANIMATIONS = [
  { id: 'fade', label: 'Fade' },
  { id: 'flip', label: 'Flip' },
  { id: 'slide', label: 'Slide' },
  { id: 'typewriter', label: 'Typewriter' },
];

export default function TickerBehaviour({ st, setSt }) {
  const { behavior } = st;

  const setSpeed = (v) => setSt((state) => ({ ...state, behavior: { ...state.behavior, speed: parseInt(v, 10) } }));
  const setMode = (m) => setSt((state) => ({ ...state, behavior: { ...state.behavior, mode: m } }));
  const setAnimation = (a) => setSt((state) => ({ ...state, behavior: { ...state.behavior, animation: a } }));
  const setItemDuration = (v) => setSt((state) => ({ ...state, behavior: { ...state.behavior, itemDuration: Math.min(30, Math.max(1, v)) } }));

  return (
    <div className="style-sec">
      <div className="form-row form-row-4">
        <div className="form-g" style={{ gridColumn: 'span 2' }}>
          <label className="form-lbl">Display Mode</label>
          <div className="src-tog" style={{ marginBottom: 0 }}>
            <button className={'src-opt' + (behavior.mode === 'loop' ? ' active' : '')} onClick={() => setMode('loop')}>Continuous</button>
            <button className={'src-opt' + (behavior.mode === 'single' ? ' active' : '')} onClick={() => setMode('single')}>Sequential</button>
          </div>
        </div>

        {behavior.mode === 'loop' && (
          <div className="form-g">
            <label className="form-lbl">Scroll Speed</label>
            <select className="form-inp form-sel" value={behavior.speed} onChange={(e) => setSpeed(e.target.value)}>
              <option value={1}>Slow</option>
              <option value={2}>Medium</option>
              <option value={3}>Fast</option>
            </select>
          </div>
        )}

        {behavior.mode === 'single' && (
          <>
            <div className="form-g">
              <label className="form-lbl">Text Animation</label>
              <select className="form-inp form-sel" value={behavior.animation || 'fade'} onChange={(e) => setAnimation(e.target.value)}>
                {ANIMATIONS.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
            </div>
            <div className="form-g">
              <label className="form-lbl">Duration (sec)</label>
              <input
                type="number"
                className="form-inp"
                min={1}
                max={30}
                value={behavior.itemDuration || 5}
                onChange={(e) => setItemDuration(parseInt(e.target.value, 10) || 1)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
