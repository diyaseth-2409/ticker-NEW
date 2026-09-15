import { decodeState } from '../utils.js';
import TickerView from './TickerView.jsx';

// Standalone page: renders ONLY the ticker bar at real size, on a
// transparent page background — meant to be opened as its own tab/URL
// (or dropped into OBS as a browser source) with no editor chrome.
export default function PlayerView({ hash }) {
  const query = hash.split('?')[1] || '';
  const params = new URLSearchParams(query);
  const data = params.get('data');

  let st = null;
  let error = null;
  try {
    st = data ? decodeState(data) : null;
  } catch (e) {
    error = 'Could not read ticker data from URL.';
  }

  if (!st) {
    return (
      <div style={{ padding: 24, fontFamily: 'Inter, sans-serif', color: '#7A756E' }}>
        {error || 'No ticker data provided.'}
      </div>
    );
  }

  return (
    <div className="player-page">
      <TickerView st={st} />
    </div>
  );
}
