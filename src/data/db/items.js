import { RARITIES } from "./rarities";
import { SLOTS } from "./slots";
import { CHARCLASSES } from "./charClasses";

export const itemDB = CHARCLASSES.flatMap((charClass) =>
  RARITIES.flatMap((rarityObj) =>
    SLOTS.map((slotObj) => ({
      id: `${slotObj.id}_${rarityObj.id}_${charClass}`,
      type: "equipment",
      rarity: rarityObj.id,
      slot: slotObj.id,
      charClass,
      stats: {},
      // icon: iconsMap[rarity],
    }))
  )
);
