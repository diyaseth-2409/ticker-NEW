import ContentTab from './ContentTab.jsx';

export default function EditorPanel({ st, setSt }) {
  return (
    <main className="panel-center">
      <div className="tab-body">
        <ContentTab st={st} setSt={setSt} />
      </div>
    </main>
  );
}
