import { RARITIES } from "./rarities";
import { SLOTS } from "./slots";

import unknownFragment from "../../assets/icons/fragments/unknown_fragment.png";
import questionMark from "../../assets/icons/fragments/question-mark.png";

export const fragmentsDB = RARITIES.flatMap((rarityObj) =>
  SLOTS.map((slotObj) => ({
    type: "unknownFragment",
    rarity: rarityObj.name,
    slot: slotObj.name,
    identified: false,
    icon: unknownFragment,
    overlay: questionMark,
  }))
);
