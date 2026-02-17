import { InventoryCharacterPanel } from "../../components/inventoryCharacterPanel/InventoryCharacterPanel";
import { Inventory } from "../../components/inventory/Inventory";

import "./inventoryPage.scss";

export default function InventoryPage() {
  return (
    <div className="inventory">
      <InventoryCharacterPanel />
      <Inventory />
    </div>
  );
}
