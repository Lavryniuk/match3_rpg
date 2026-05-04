import "./unknownFragmentCell.scss";

export function UnknownFragmentCell({ item }) {
  return (
    <div className="cell__fragment">
      <img className="cell__icon" src={item.icon} alt="unknownFragment" />
      <img className="cell__overlay" src={item.overlay} alt="questionMark" />
    </div>
  );
}
