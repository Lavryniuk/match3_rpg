import { UnknownFragmentCell } from "./unknownFragmentCell/UnknownFragmentCell";
import { EquipmentCell } from "./equipmentCell/EquipmentCell";
import { FragmentsStackCell } from "./fragmentsStackCell/FragmentsStackCell";

export function CellContent({ item }) {
  switch (item.type) {
    case "unknownFragment":
      return <UnknownFragmentCell item={item} />;
    case "fragmentsStack":
      return <FragmentsStackCell item={item} />;
    case "equipment":
      return <EquipmentCell item={item} />;
    default:
      return null;
  }
}
