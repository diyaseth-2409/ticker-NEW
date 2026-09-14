import { useState } from 'react';
import { SPEEDS } from '../data/templates.js';
import ItemsEditor from './ItemsEditor.jsx';
import SecHeader from './SecHeader.jsx';

const RSS_HEADLINES = [
  'PM holds high-level security review amid regional tensions',
  'Supreme Court reserves judgment on key electoral bonds case',
  'Sensex closes 450 points higher; IT and banking stocks lead gains',
  'India records 7.4% GDP growth in Q2, beats analyst expectations',
  'Delhi: Heavy rain warning for next 48 hours — IMD orange alert',
];

const ANIMATIONS = [
  { id: 'fade', label: 'Fade', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" opacity="0.35" /><path d="M12 3a9 9 0 010 18" /></svg> },
  { id: 'flip', label: 'Flip', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="1.5" /><path d="M12 6v12" strokeDasharray="2 2" /></svg> },
  { id: 'slide', label: 'Slide', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h13" /><path d="M12 6l6 6-6 6" /></svg> },
  { id: 'typewriter', label: 'Typewriter', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h12" /><path d="M17 8v8" /></svg> },
];

const JSON_HEADLINES = [
  'RBI holds repo rate steady at 6.5% for fourth straight meeting',
  'ISRO successfully launches next-gen navigation satellite',
  'Rupee strengthens to 82.4 against US dollar in early trade',
  'Monsoon session of Parliament to begin next week',
  'Metro Phase 4 construction crosses 60% completion mark',
];

export default function ContentTab({ st, setSt }) {
  const [rssLoaded, setRssLoaded] = useState(false);
  const [rssError, setRssError] = useState('');
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const [jsonError, setJsonError] = useState('');

  const setItems = (items) => setSt((s) => ({ ...s, items }));

  const setSrc = (s) => setSt((state) => ({ ...state, src: s }));

  const isValidFeedUrl = (v) => {
    try {
      const u = new URL(v);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const loadRss = () => {
    setRssError('');
    setRssLoaded(false);
    const url = (st.rssUrl || '').trim();
    if (!url) {
      setRssError('Enter a feed URL to load.');
      return;
    }
    if (!isValidFeedUrl(url)) {
      setRssError('That doesn’t look like a valid URL — check the format (e.g. https://example.com/feed.xml).');
      return;
    }
    // URL format is valid — fetching/parsing the actual feed happens server-side in production.
    setItems(RSS_HEADLINES);
    setRssLoaded(true);
  };

  const loadJson = () => {
    setJsonError('');
    const raw = (st.jsonUrl || '').trim();
    if (raw.startsWith('[') || raw.startsWith('{')) {
      try {
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed) ? parsed : parsed.items;
        if (!Array.isArray(list)) throw new Error('bad shape');
        setItems(list.map((x) => (typeof x === 'string' ? x : x.headline || x.title || String(x))));
        setJsonLoaded(true);
        return;
      } catch (e) {
        setJsonError('Could not parse JSON — check the format.');
        return;
      }
    }
    setItems(JSON_HEADLINES);
    setJsonLoaded(true);
  };

  const setSpeed = (v) => setSt((s) => ({ ...s, behavior: { ...s.behavior, speed: parseInt(v, 10) } }));
  const setMode = (m) => setSt((s) => ({ ...s, behavior: { ...s.behavior, mode: m } }));
  const setAnimation = (a) => setSt((s) => ({ ...s, behavior: { ...s.behavior, animation: a } }));
  const setItemDuration = (v) => setSt((s) => ({ ...s, behavior: { ...s.behavior, itemDuration: Math.min(30, Math.max(1, v)) } }));

  const speedLabel = (SPEEDS[st.behavior.speed] || SPEEDS[2]).label;

  return (
    <div id="tab-content">
      <div className="sec">
        <div className="sec-hd"><span className="sec-title">Content Source</span></div>
        <div className="src-tog">
          <button className={'src-opt' + (st.src === 'manual' ? ' active' : '')} onClick={() => setSrc('manual')}>Manual</button>
          <button className={'src-opt' + (st.src === 'rss' ? ' active' : '')} onClick={() => setSrc('rss')}>RSS Feed</button>
          <button className={'src-opt' + (st.src === 'json' ? ' active' : '')} onClick={() => setSrc('json')}>JSON</button>
        </div>

        {st.src === 'manual' && (
          <div id="manualSec">
            <ItemsEditor items={st.items} onChange={setItems} />
          </div>
        )}

        {st.src === 'rss' && (
          <div id="rssSec">
            <div className="form-g" style={{ marginBottom: 10 }}>
              <label className="form-lbl">Feed URL</label>
              <div className="rss-row">
                <input
                  type="text"
                  className="form-inp"
                  placeholder="Paste any RSS/Atom feed URL — e.g. https://feeds.timesofindia.com/..."
                  value={st.rssUrl}
                  onChange={(e) => setSt((s) => ({ ...s, rssUrl: e.target.value }))}
                />
                <button className="btn btn-ghost" style={{ flexShrink: 0, height: 33, padding: '0 11px', fontSize: 12 }} onClick={loadRss}>Validate</button>
              </div>
            </div>
            {rssError && (
              <div className="feed-status feed-status-error">{rssError}</div>
            )}
            {rssLoaded && !rssError && (
              <ItemsEditor items={st.items} onChange={setItems} />
            )}
          </div>
        )}

        {st.src === 'json' && (
          <div id="jsonSec">
            <div className="form-g" style={{ marginBottom: 10 }}>
              <label className="form-lbl">JSON URL or raw array</label>
              <div className="rss-row">
                <input
                  type="text"
                  className="form-inp"
                  placeholder='https://api.example.com/headlines.json or ["Headline 1", "Headline 2"]'
                  value={st.jsonUrl}
                  onChange={(e) => setSt((s) => ({ ...s, jsonUrl: e.target.value }))}
                />
                <button className="btn btn-ghost" style={{ flexShrink: 0, height: 33, padding: '0 11px', fontSize: 12 }} onClick={loadJson}>Validate</button>
              </div>
            </div>
            {jsonError && (
              <div className="feed-status feed-status-error">{jsonError}</div>
            )}
            {jsonLoaded && !jsonError && (
              <ItemsEditor items={st.items} onChange={setItems} />
            )}
          </div>
        )}
      </div>

      <div className="sec">
        <SecHeader
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>}
          title="Ticker Behaviour"
          sub="Control how your ticker moves and is displayed."
        />
        <div className="behaviour-stack">
          <div className="mode-block">
            <label className="form-lbl">Display Mode</label>
            <div className="mode-cards">
              <button className={'mode-card' + (st.behavior.mode === 'loop' ? ' active' : '')} onClick={() => setMode('loop')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4" /><path d="M3 12.6v-2a4 4 0 014-4h14" /><path d="M7 21.9l-4-4 4-4" /><path d="M21 11.4v2a4 4 0 01-4 4H3" /></svg>
                <div><div className="mode-card-title">Continuous Loop</div><div className="mode-card-sub">Repeats all items</div></div>
              </button>
              <button className={'mode-card' + (st.behavior.mode === 'single' ? ' active' : '')} onClick={() => setMode('single')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                <div><div className="mode-card-title">Single Pass</div><div className="mode-card-sub">Shows each item once</div></div>
              </button>
            </div>
          </div>

          {st.behavior.mode === 'loop' && (
            <div className="speed-block">
              <label className="form-lbl">Scroll Speed</label>
              <div className="slider-row">
                <span className="slider-icon" title="Slow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15a4 4 0 018 0v1H4v-1z" /><circle cx="7" cy="18" r="1.4" /><circle cx="14" cy="18" r="1.4" /><path d="M12 15h4l2-3" /><path d="M2 11h3M2 8h5M2 14h2" /></svg>
                </span>
                <input type="range" min="1" max="3" step="1" value={st.behavior.speed} onChange={(e) => setSpeed(e.target.value)} />
                <span className="slider-icon" title="Fast">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c2 2 3 5 3 8 0 2-1 3-1 3s3-1 4-3c1 3 0 6-2 8-1.5 1.5-3.5 2-4 2s-2.5-.5-4-2c-2-2-3-5-2-8 1 2 4 3 4 3s-1-1-1-3c0-3 1-6 3-8z" /></svg>
                </span>
              </div>
              <div className="slider-labels">
                <span className="slider-side">Slow</span>
                <span className={'slider-val-lbl' + (st.behavior.speed === 2 ? ' active' : '')}>{speedLabel}</span>
                <span className="slider-side r">Fast</span>
              </div>
            </div>
          )}

          {st.behavior.mode === 'single' && (
            <div className="anim-duration-row">
              <div className="anim-block">
                <label className="form-lbl">Text Animation</label>
                <div className="anim-cards">
                  {ANIMATIONS.map((a) => (
                    <button
                      key={a.id}
                      className={'anim-card' + (st.behavior.animation === a.id ? ' active' : '')}
                      onClick={() => setAnimation(a.id)}
                    >
                      {a.icon}
                      <span>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="duration-stepper">
                <label className="form-lbl">Show Each For</label>
                <div className="stepper-row">
                  <button className="stepper-btn" onClick={() => setItemDuration((st.behavior.itemDuration || 5) - 1)} aria-label="Decrease">−</button>
                  <input
                    type="number"
                    className="stepper-inp"
                    min={1}
                    max={30}
                    value={st.behavior.itemDuration || 5}
                    onChange={(e) => setItemDuration(parseInt(e.target.value, 10) || 1)}
                  />
                  <span className="stepper-unit">sec</span>
                  <button className="stepper-btn" onClick={() => setItemDuration((st.behavior.itemDuration || 5) + 1)} aria-label="Increase">+</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
