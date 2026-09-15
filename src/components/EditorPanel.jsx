import ContentSource from './ContentSource.jsx';

export default function EditorPanel({ st, setSt }) {
  return (
    <main className="panel-center">
      <div className="tab-body">
        <ContentSource st={st} setSt={setSt} />
      </div>
    </main>
  );
}
