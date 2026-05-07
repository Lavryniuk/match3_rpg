import { useGame } from "../../game/GameProvider";
import { InventoryCell } from "../inventoryCell/InventoryCell";

import { getReward } from "../../utils/inventoryUtils";
import { SLOTS } from "../../data/db/slots";
import { RARITIES } from "../../data/db/rarities";
import { fragmentsDB } from "../../data/db/fragments";

import "./inventory.scss";

const COLUMNS = 4;
const MIN_ROWS = 2;

export function Inventory({ onSelectCell }) {
  const {
    unknownFragments,
    fragmentStacks,
    equipmentsInventory,
    addUnknownFragment,
    addCoins,
  } = useGame();

  const items = [
    ...unknownFragments,
    ...fragmentStacks,
    ...equipmentsInventory,
  ];

  const minCells = COLUMNS * MIN_ROWS;

  const neededCells = Math.max(
    minCells,
    Math.ceil((items.length + 1) / COLUMNS) * COLUMNS
  );

  const cells = Array.from({ length: neededCells }, (_, i) => items[i]);

  const onReward = ({
    levelCoinAmount,
    rarities,
    slots,
    fragments,
    addCoins,
    addUnknownFragment,
  }) => {
    getReward({
      levelCoinAmount,
      rarities,
      slots,
      fragments,
      addCoins,
      addUnknownFragment,
    });
  };

  return (
    <div className="inventory__grid-wrapper">
      <h2 className="inventory__grid-name">Inventory</h2>
      <div className="wrapper">
        <button
          onClick={() =>
            onReward({
              levelCoinAmount: 100,
              rarities: RARITIES,
              slots: SLOTS,
              fragments: fragmentsDB,
              addCoins,
              addUnknownFragment,
            })
          }
        >
          reward
        </button>
      </div>

      <div className="inventory__grid">
        {cells.map((_, index) => {
          const item = items[index];

          return (
            <div
              key={index}
              onClick={() => onSelectCell(item)}
              className="inventory__cell"
            >
              <InventoryCell item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
