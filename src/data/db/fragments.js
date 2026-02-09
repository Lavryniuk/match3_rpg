import { v4 as uuidv4 } from "uuid";

import { RARITIES } from "./rarities";
import { SLOTS } from "./slots";

export const fragmentsDB = RARITIES.flatMap((rarityObj) =>
  SLOTS.map((slotObj) => ({
    id: uuidv4(),
    type: "fragment",
    rarity: rarityObj.name,
    slot: slotObj.name,
    identified: false,
    icon: rarityObj.icon,
  }))
);
