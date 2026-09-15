import TickerView from './TickerView.jsx';
import StyleControls from './StyleControls.jsx';

export default function PreviewPanel({ st, setSt }) {
  return (
    <aside className="panel-right">
      <div className="broadcast-canvas">
        <div className="broadcast-frame-group">
          <div className="broadcast-frame" id="broadcastFrame">
            <div className="broadcast-video">
              <svg className="broadcast-wave" viewBox="0 0 100 60" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7">
                <path d="M0 30c8-11 16 11 25 0s17-11 25 0 17 11 25 0 17-11 25 0" />
                <path d="M0 38c8-11 16 11 25 0s17-11 25 0 17 11 25 0 17-11 25 0" opacity=".6" />
                <path d="M0 22c8-11 16 11 25 0s17-11 25 0 17 11 25 0 17-11 25 0" opacity=".4" />
              </svg>
            </div>
            <TickerView st={st} scaled />
          </div>
        </div>
      </div>

      <div className="panel-right-scroll">
        <StyleControls st={st} setSt={setSt} />
      </div>
    </aside>
  );
}
