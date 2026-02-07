const charClasses = ["paladin", "sorceress", "archer"];

const rarities = ["gray", "green", "blue", "purple", "gold"];
const slots = ["helmet", "body", "weapon", "shield", "boots"];

export const itemDB = charClasses.flatMap((charClass) =>
  rarities.flatMap((rarity) =>
    slots.map((slot) => ({
      id: `${slot}_${rarity}_${charClass}`,
      type: "equipment",
      rarity,
      slot,
      charClass,
      stats: {},
      // icon: iconsMap[rarity],
    }))
  )
);
