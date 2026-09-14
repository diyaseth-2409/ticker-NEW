export default function SecHeader({ icon, title, sub, action }) {
  return (
    <div className="sec-hd2">
      <div className="sec-hd2-icon">{icon}</div>
      <div className="sec-hd2-text">
        <div className="sec-hd2-title">{title}</div>
        <div className="sec-hd2-sub">{sub}</div>
      </div>
      {action && <div className="sec-hd2-action">{action}</div>}
    </div>
  );
}
