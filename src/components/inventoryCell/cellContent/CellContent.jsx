import { UnknownFragmentCell } from "./unknownFragmentCell/UnknownFragmentCell";
import { EquipmentCell } from "./equipmentCell/EquipmentCell";
import { FragmentStacksCell } from "./fragmentStacksCell/FragmentStacksCell";

export function CellContent({ item }) {
  switch (item.type) {
    case "unknownFragment":
      return <UnknownFragmentCell item={item} />;
    case "fragmentStacks":
      return <FragmentStacksCell item={item} />;
    case "equipment":
      return <EquipmentCell item={item} />;
    default:
      return null;
  }
}
