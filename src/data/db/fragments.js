import { RARITIES } from "./rarities";
import { SLOTS } from "./slots";

export const fragmentsDB = RARITIES.flatMap((rarityObj) =>
  SLOTS.map((slotObj) => ({
    id: `frag_${slotObj.name}_${rarityObj.name}`,
    type: "fragment",
    rarity: rarityObj.name,
    slot: slotObj.name,
    identified: false,
    icon: rarityObj.icon,
  }))
);
