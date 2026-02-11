import { RARITIES } from "./rarities";
import { SLOTS } from "./slots";

export const fragmentsDB = RARITIES.flatMap((rarityObj) =>
  SLOTS.map((slotObj) => ({
    type: "unknownFragment",
    rarity: rarityObj.name,
    slot: slotObj.name,
    identified: false,
  }))
);
