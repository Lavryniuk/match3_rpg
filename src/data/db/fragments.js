import grayFragment from "../assets/icons/fragments/gray-fragment.png";
import greenFragment from "../assets/icons/fragments/green-fragment.png";
import blueFragment from "../assets/icons/fragments/blue-fragment.png";
import purpleFragment from "../assets/icons/fragments/purple-fragment.png";
import goldFragment from "../assets/icons/fragments/gold-fragment.png";

export const iconsMap = {
  gray: grayFragment,
  green: greenFragment,
  blue: blueFragment,
  purple: purpleFragment,
  gold: goldFragment,
};

const rarities = ["gray", "green", "blue", "purple", "gold"];
const slots = ["helmet", "body", "weapon", "shield", "boots"];

export const fragmentsDB = rarities.flatMap((rarity) =>
  slots.map((slot) => ({
    id: `frag_${slot}_${rarity}`,
    type: "fragment",
    rarity,
    slot,
    identified: false,
    icon: grayFragment,
  }))
);
