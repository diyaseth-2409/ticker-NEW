import { useState } from 'react';

// Shown right after a Background Video upload — lets the user preview the
// clip at its real 16:9 aspect and give it an editable display name, mirroring
// the image cropper's post-upload flow.
export default function VideoNameModal({ src, fileName, onCancel, onConfirm }) {
  const [name, setName] = useState(fileName || 'Untitled video');

  return (
    <div className="cropper-overlay" role="dialog" aria-modal="true">
      <div className="cropper-card cropper-card-video">
        <div className="cropper-header">
          <div>
            <div className="cropper-title">Background video (16:9)</div>
            <div className="cropper-subtitle">Preview the clip and give it a name</div>
          </div>
          <button type="button" className="cropper-close" onClick={onCancel} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="cropper-body cropper-body-video">
          <div className="cropper-stage-scroll">
            <div className="video-name-stage">
              <span className="cropper-ratio-tag">16:9</span>
              <video className="video-name-preview" src={src} muted loop autoPlay playsInline />
            </div>
          </div>

          <div className="cropper-panel">
            <div className="cropper-panel-g">
              <label className="cropper-panel-lbl">Video name</label>
              <input
                type="text"
                className="form-inp cropper-name-inp"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter video name"
              />
            </div>
          </div>
        </div>

        <div className="cropper-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={() => onConfirm(name)}>Use video</button>
        </div>
      </div>
    </div>
  );
}
