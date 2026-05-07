import { InventoryCell } from "../inventoryCell/InventoryCell";

import { SLOTS } from "../../data/db/slots";

import "./backCard.scss";

export function BackCard({ onSelectCell, currentInventory }) {
  return (
    <div className="character__card-back">
      <div className="character__card-grid">
        {SLOTS.map((slot) => (
          <div
            key={slot.name}
            onClick={() => onSelectCell(currentInventory[slot.name])}
            className="character__card-cell"
          >
            <InventoryCell
              item={currentInventory[slot.name]}
              slotName={slot.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
