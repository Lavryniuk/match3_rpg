import unknownFragment from "../../../../assets/icons/fragments/unknown_fragment.png";
import questionMark from "../../../../assets/icons/fragments/question-mark.png";

export function UnknownFragmentCell({ item }) {
  return (
    <div className="cell__fragment">
      <img src={unknownFragment} alt="" />
      <img src={questionMark} alt="" />
    </div>
  );
}
