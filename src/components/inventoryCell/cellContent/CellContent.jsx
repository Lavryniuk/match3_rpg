import { FragmentCell } from "./fragmentCell/FragmentCell";
import { EquipmentCell } from "./equipmentCell/EquipmentCell";

export function CellContent({ item }) {
  switch (item.type) {
    case "fragment":
      return <FragmentCell item={item} />;
    case "equipment":
      return <EquipmentCell item={item} />;
    default:
      return null;
  }
}
