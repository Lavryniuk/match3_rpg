import { CellContent } from "./cellContent/CellContent";

import "./inventoryCell.scss";

export function InventoryCell({ item }) {
  return (
    <div className="cell__outer"> {item && <CellContent item={item} />}</div>
  );
}
