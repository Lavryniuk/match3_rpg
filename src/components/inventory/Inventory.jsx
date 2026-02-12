import { useGame } from "../../game/GameProvider";
import { InventoryCell } from "../inventoryCell/InventoryCell";

import {
  getReward,
  identifyFragment,
  craftItem,
} from "../../utils/inventoryUtils";
import { SLOTS } from "../../data/db/slots";
import { RARITIES } from "../../data/db/rarities";
import { fragmentsDB } from "../../data/db/fragments";
import { equipmentsDB } from "../../data/db/equipments";
import { CHARCLASSES } from "../../data/db/charClasses";

import "./inventory.scss";

const COLUMNS = 4;
const MIN_ROWS = 2;

export function Inventory({}) {
  const {
    unknownFragments,
    fragmentsInventory,
    equipmentsInventory,
    addFragment,
    scrolls,
    useScroll,
    addUnknownFragment,
    addCoins,
    removeUnknownFragment,
    removeFragments,
    addEquipment,
  } = useGame();

  const items = [
    ...unknownFragments,
    ...fragmentsInventory,
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

  const onIdentification = ({
    fragment,
    addFragment,
    removeUnknownFragment,
    scrolls,
    useScroll,
  }) => {
    identifyFragment({
      fragment,
      addFragment,
      removeUnknownFragment,
      scrolls,
      useScroll,
    });
  };

  const onCraft = ({
    fragment,
    removeFragments,
    addEquipment,
    equipments,
    charClasses,
  }) => {
    craftItem({
      fragment,
      removeFragments,
      addEquipment,
      equipments,
      charClasses,
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
              onClick={() =>
                item?.type === "unknownFragment"
                  ? onIdentification({
                      fragment: item,
                      addFragment,
                      removeUnknownFragment,
                      scrolls,
                      useScroll,
                    })
                  : onCraft({
                      fragment: item,
                      removeFragments,
                      addEquipment,
                      equipments: equipmentsDB,
                      charClasses: CHARCLASSES,
                    })
              }
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
