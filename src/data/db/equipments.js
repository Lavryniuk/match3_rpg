import { v4 as uuidv4 } from "uuid";

import { RARITIES } from "./rarities";
import { SLOTS } from "./slots";
import { CHARCLASSES } from "./charClasses";

export const equipmentsDB = CHARCLASSES.flatMap((charClassObj) =>
  RARITIES.flatMap((rarityObj) =>
    SLOTS.map((slotObj) => ({
      id: uuidv4(),
      type: "equipment",
      rarity: rarityObj.name,
      slot: slotObj.name,
      charClass: charClassObj.name,
      stats: {},
      // icon: iconsMap[rarity],
    }))
  )
);
