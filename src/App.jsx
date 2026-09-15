import { useState } from 'react';
import { initialState } from './data/initialState.js';
import { TPLS } from './data/templates.js';
import TemplateGallery from './components/TemplateGallery.jsx';
import Header from './components/Header.jsx';
import EditorPanel from './components/EditorPanel.jsx';
import PreviewPanel from './components/PreviewPanel.jsx';

export default function App() {
  const [view, setView] = useState('gallery'); // 'gallery' | 'studio'
  const [st, setSt] = useState(initialState);
  const [saved, setSaved] = useState(false);

  const applyTemplate = (id) => {
    setSt((s) => {
      const t = TPLS.find((tpl) => tpl.id === id);
      if (!t) return { ...s, template: id };
      const badge = JSON.parse(JSON.stringify(t.badge));
      return {
        ...s,
        template: id,
        style: JSON.parse(JSON.stringify(t.style)),
        badge: { ...s.badge, ...badge, customText: badge.type },
        text: JSON.parse(JSON.stringify(t.text)),
      };
    });
  };

  const pickTemplate = (id) => {
    applyTemplate(id);
    setView('studio');
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2600);
  };

  if (view === 'gallery') {
    return <TemplateGallery onPick={pickTemplate} />;
  }

  return (
    <>
      <Header st={st} onSave={handleSave} saved={saved} onBack={() => setView('gallery')} />
      <div className="studio">
        <EditorPanel st={st} setSt={setSt} />
        <PreviewPanel st={st} setSt={setSt} />
      </div>
    </>
  );
}
