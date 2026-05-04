import { RARITIES } from "../../../../data/db/rarities";
import { SLOTS } from "../../../../data/db/slots";

import "./fragmentStacksCell.scss";

export function FragmentStacksCell({ item, showCount = true }) {
  const rarityData = RARITIES.find((r) => r.name === item?.rarity);
  const slotsData = SLOTS.find((s) => s.name === item.slot);

  return (
    <div className="cell__stack">
      <img className="stack__icon" src={slotsData.icon} alt="" />
      <img className="stack__overlay" src={rarityData.icon} alt="" />

      {showCount && <div className="stack__count">{item.count}</div>}
    </div>
  );
}
