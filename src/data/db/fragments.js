import { RARITIES } from "./rarities";
import { SLOTS } from "./slots";

export const fragmentsDB = RARITIES.flatMap((rarityObj) =>
  SLOTS.map((slotObj) => ({
    id: `frag_${slotObj.id}_${rarityObj.id}`,
    type: "fragment",
    rarity: rarityObj.id,
    slot: slotObj.id,
    identified: false,
    icon: rarityObj.icon,
  }))
);
