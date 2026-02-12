import { EQUIPMENT_ICONS } from "../../../../data/db/equipmentIconsMap";
import { RARITIES } from "../../../../data/db/rarities";

import "./equipmentCell.scss";

export function EquipmentCell({ item }) {
  const equipmentIcon = EQUIPMENT_ICONS[item.charClass][item.slot];
  const rarityGlow = RARITIES.find((f) => f.name === item.rarity);

  return (
    <div className="cell__equipment">
      <img
        className="equipment__glow"
        src={rarityGlow.glow}
        alt="rarity_glow"
      />
      <img
        className="equipment__icon"
        src={equipmentIcon}
        alt="equipment_icon"
      />
    </div>
  );
}
