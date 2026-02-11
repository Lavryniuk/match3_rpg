export function EquipmentCell({ item }) {
  return (
    <div className="cell__equipment">
      <img src={item.icon} alt="" />
      <img className="cell__glow" src={item.glow} alt="rarity_glow" />
    </div>
  );
}
