import { useState } from 'react';
import ItemsEditor from './ItemsEditor.jsx';

const RSS_HEADLINES = [
  'PM holds high-level security review amid regional tensions',
  'Supreme Court reserves judgment on key electoral bonds case',
  'Sensex closes 450 points higher; IT and banking stocks lead gains',
  'India records 7.4% GDP growth in Q2, beats analyst expectations',
  'Delhi: Heavy rain warning for next 48 hours — IMD orange alert',
];

const JSON_HEADLINES = [
  'RBI holds repo rate steady at 6.5% for fourth straight meeting',
  'ISRO successfully launches next-gen navigation satellite',
  'Rupee strengthens to 82.4 against US dollar in early trade',
  'Monsoon session of Parliament to begin next week',
  'Metro Phase 4 construction crosses 60% completion mark',
];

const SRC_LABEL = { manual: 'Manual', rss: 'Feed', json: 'JSON' };

// A draft "has data" if at least one non-blank line exists.
const hasData = (list) => Array.isArray(list) && list.some((x) => (x || '').trim());

export default function ContentSource({ st, setSt }) {
  const [rssLoaded, setRssLoaded] = useState(false);
  const [rssError, setRssError] = useState('');
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const [jsonError, setJsonError] = useState('');

  // pendingSave: which tab's Save was clicked while other tabs also hold data —
  // drives the "which source do you want to use" confirm modal.
  const [pendingSave, setPendingSave] = useState(null); // 'manual' | 'rss' | 'json' | null
  const [savedFlag, setSavedFlag] = useState(null); // which tab just showed "Saved!"

  // viewTab: which tab panel is open for editing — independent of st.src,
  // which is the source actually live on the ticker (drives the active-tab highlight).
  const [viewTab, setViewTab] = useState(st.src);

  const drafts = st.drafts || { manual: [], rss: [], json: [] };

  const setDraft = (key, items) =>
    setSt((s) => ({ ...s, drafts: { ...(s.drafts || {}), [key]: items } }));

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
    setDraft('rss', RSS_HEADLINES);
    setRssLoaded(true);
  };

  const loadJson = () => {
    setJsonError('');
    setJsonLoaded(false);
    const raw = (st.jsonUrl || '').trim();
    if (raw.startsWith('[') || raw.startsWith('{')) {
      try {
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed) ? parsed : parsed.items;
        if (!Array.isArray(list)) throw new Error('bad shape');
        setDraft('json', list.map((x) => (typeof x === 'string' ? x : x.headline || x.title || String(x))));
        setJsonLoaded(true);
        return;
      } catch (e) {
        setJsonError('Could not parse JSON — check the format.');
        return;
      }
    }
    setDraft('json', JSON_HEADLINES);
    setJsonLoaded(true);
  };

  // Other sources (besides `key`) that currently hold data.
  const othersWithData = (key) => Object.keys(drafts).filter((k) => k !== key && hasData(drafts[k]));

  const commit = (key) => {
    setSt((s) => ({ ...s, src: key, items: (s.drafts || drafts)[key] || [] }));
    setSavedFlag(key);
    setTimeout(() => setSavedFlag((f) => (f === key ? null : f)), 2200);
  };

  const handleSaveClick = (key) => {
    if (othersWithData(key).length > 0) {
      setPendingSave(key);
      return;
    }
    commit(key);
  };

  const chooseSource = (key) => {
    setPendingSave(null);
    setViewTab(key);
    commit(key);
  };

  return (
    <div className="sec">
      <div className="sec-hd"><span className="sec-title">Content Source</span></div>
      <div className="src-tog">
        <button className={'src-opt' + (viewTab === 'manual' ? ' active' : '')} onClick={() => setViewTab('manual')}>
          Manual{st.src === 'manual' && <span className="src-opt-live-dot" title="Live on ticker" />}
        </button>
        <button className={'src-opt' + (viewTab === 'rss' ? ' active' : '')} onClick={() => setViewTab('rss')}>
          Feed{st.src === 'rss' && <span className="src-opt-live-dot" title="Live on ticker" />}
        </button>
        <button className={'src-opt' + (viewTab === 'json' ? ' active' : '')} onClick={() => setViewTab('json')}>
          JSON{st.src === 'json' && <span className="src-opt-live-dot" title="Live on ticker" />}
        </button>
      </div>

      {viewTab === 'manual' && (
        <div id="manualSec">
          <ItemsEditor items={drafts.manual} onChange={(v) => setDraft('manual', v)} />
          <SaveRow onSave={() => handleSaveClick('manual')} saved={savedFlag === 'manual'} active={st.src === 'manual'} />
        </div>
      )}

      {viewTab === 'rss' && (
        <div id="rssSec">
          <div className="form-g" style={{ marginBottom: 10 }}>
            <label className="form-lbl">Feed URL</label>
            <div className="rss-row">
              <input
                type="text"
                className="form-inp"
                placeholder="Paste any RSS/Atom feed URL — e.g. https://feeds.timesofindia.com/..."
                value={st.rssUrl}
                onChange={(e) => { setRssLoaded(false); setSt((s) => ({ ...s, rssUrl: e.target.value })); }}
              />
              <button className={'btn' + (rssLoaded && !rssError ? ' btn-success' : ' btn-ghost')} style={{ flexShrink: 0, height: 33, padding: '0 11px', fontSize: 12 }} onClick={loadRss}>
                {rssLoaded && !rssError ? 'Validated' : 'Validate'}
              </button>
            </div>
          </div>
          {rssError && (
            <div className="feed-status feed-status-error">{rssError}</div>
          )}
          {rssLoaded && !rssError && (
            <>
              <ItemsEditor items={drafts.rss} onChange={() => {}} readOnly />
              <SaveRow onSave={() => handleSaveClick('rss')} saved={savedFlag === 'rss'} active={st.src === 'rss'} />
            </>
          )}
        </div>
      )}

      {viewTab === 'json' && (
        <div id="jsonSec">
          <div className="form-g" style={{ marginBottom: 10 }}>
            <label className="form-lbl">JSON URL or raw array</label>
            <div className="rss-row">
              <input
                type="text"
                className="form-inp"
                placeholder='https://api.example.com/headlines.json or ["Headline 1", "Headline 2"]'
                value={st.jsonUrl}
                onChange={(e) => { setJsonLoaded(false); setSt((s) => ({ ...s, jsonUrl: e.target.value })); }}
              />
              <button className={'btn' + (jsonLoaded && !jsonError ? ' btn-success' : ' btn-ghost')} style={{ flexShrink: 0, height: 33, padding: '0 11px', fontSize: 12 }} onClick={loadJson}>
                {jsonLoaded && !jsonError ? 'Validated' : 'Validate'}
              </button>
            </div>
          </div>
          {jsonError && (
            <div className="feed-status feed-status-error">{jsonError}</div>
          )}
          {jsonLoaded && !jsonError && (
            <>
              <ItemsEditor items={drafts.json} onChange={() => {}} readOnly />
              <SaveRow onSave={() => handleSaveClick('json')} saved={savedFlag === 'json'} active={st.src === 'json'} />
            </>
          )}
        </div>
      )}

      {pendingSave && (
        <SourceConflictModal
          requested={pendingSave}
          candidates={[pendingSave, ...othersWithData(pendingSave)]}
          onChoose={chooseSource}
          onCancel={() => setPendingSave(null)}
        />
      )}
    </div>
  );
}

function SaveRow({ onSave, saved, active }) {
  return (
    <div className="src-save-row">
      {active && <span className="src-save-hint">This source is currently live on the ticker.</span>}
      <button className={'btn btn-primary' + (saved ? ' btn-success' : '')} onClick={onSave}>
        {saved ? 'Saved!' : 'Save'}
      </button>
    </div>
  );
}

function SourceConflictModal({ requested, candidates, onChoose, onCancel }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-title">Multiple content sources have data</div>
        <p className="modal-body">
          You also have content saved in {candidates.filter((c) => c !== requested).map((c) => SRC_LABEL[c]).join(' and ')}.
          Choose which source should be used on the ticker.
        </p>
        <div className="modal-choices">
          {candidates.map((c) => (
            <button key={c} className={'modal-choice' + (c === requested ? ' modal-choice-suggested' : '')} onClick={() => onChoose(c)}>
              <span>{SRC_LABEL[c]}</span>
              {c === requested && <span className="modal-choice-tag">just edited</span>}
            </button>
          ))}
        </div>
        <button className="btn btn-ghost modal-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
