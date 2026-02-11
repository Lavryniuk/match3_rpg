import { RARITIES } from "../../../../data/db/rarities";

export function FragmentsStackCell({ item }) {
  const rarityData = RARITIES.find((r) => r.name === item?.rarity);

  return (
    <div>
      <img src={rarityData.icon} alt="" />
      <div className="cell__count">{item.count}</div>
    </div>
  );
}
