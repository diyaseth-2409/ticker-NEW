import { useRef } from 'react';
import WidgetView from './WidgetView.jsx';
import WidgetStyleControls from './WidgetStyleControls.jsx';
import FullscreenButton from './FullscreenButton.jsx';

export default function WidgetPreviewPanel({ st, setSt, viewTab }) {
  const canvasRef = useRef(null);

  return (
    <aside className="panel-right">
      <div className="broadcast-canvas widget-canvas" ref={canvasRef}>
        <FullscreenButton targetRef={canvasRef} />
        <WidgetView st={st} setSt={setSt} viewTab={viewTab} />
      </div>

      <div className="panel-right-scroll">
        <WidgetStyleControls st={st} setSt={setSt} />
      </div>
    </aside>
  );
}
