import { useGame } from "../../game/GameProvider";
import { InventoryCell } from "../inventoryCell/InventoryCell";

import { getReward, identifyFragment } from "../../utils/inventoryUtils";
import { SLOTS } from "../../data/db/slots";
import { RARITIES } from "../../data/db/rarities";
import { fragmentsDB } from "../../data/db/fragments";

import "./inventory.scss";

const COLUMNS = 5;
const MIN_ROWS = 3;

export function Inventory({}) {
  const {
    fragmentsInventory,
    equipmentsInventory,
    addFragment,
    useScroll,
    addUnknownFragment,
    addCoins,
  } = useGame();

  const items = [...fragmentsInventory, ...equipmentsInventory];

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

  const onIdentification = ({ fragment, addFragment, useScroll }) => {
    identifyFragment({ fragment, addFragment, useScroll });
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
        {cells.map((item, index) => (
          <div
            key={item?.id || index}
            className="inventory__cell"
            onClick={() =>
              onIdentification({ fragment: item, addFragment, useScroll })
            }
          >
            <InventoryCell item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
