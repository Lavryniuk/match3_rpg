import unknownFragment from "../../../../assets/icons/fragments/unknown_fragment.png";

export function FragmentCell({ item }) {
  return (
    <div className="cell__fragment">
      {item.identified ? (
        <img src={item.icon} alt="" />
      ) : (
        <img src={unknownFragment} alt="" />
      )}
      <div className="cell__count">{item.count}</div>
    </div>
  );
}
