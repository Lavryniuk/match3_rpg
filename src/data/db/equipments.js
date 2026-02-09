import { RARITIES } from "./rarities";
import { SLOTS } from "./slots";
import { CHARCLASSES } from "./charClasses";

export const equipmentsDB = CHARCLASSES.flatMap((charClassObj) =>
  RARITIES.flatMap((rarityObj) =>
    SLOTS.map((slotObj) => ({
      id: `${slotObj.name}_${rarityObj.name}_${charClassObj.name}`,
      type: "equipment",
      rarity: rarityObj.name,
      slot: slotObj.name,
      charClass: charClassObj.name,
      stats: {},
      // icon: iconsMap[rarity],
    }))
  )
);
