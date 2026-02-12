import unknownFragment from "../../../../assets/icons/fragments/unknown_fragment.png";
import questionMark from "../../../../assets/icons/fragments/question-mark.png";

import "./unknownFragmentCell.scss";

export function UnknownFragmentCell({ item }) {
  return (
    <div className="cell__fragment">
      <img className="cell__icon" src={unknownFragment} alt="unknownFragment" />
      <img className="cell__overlay" src={questionMark} alt="questionMark" />
    </div>
  );
}
