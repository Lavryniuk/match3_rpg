import { CellContent } from "../cellContent/CellContent";

import "./inventoryCellModal.scss";

export function InventoryCellModal({
  item,
  onClose,
  onIdentification,
  onCraft,
  onEquip,
  onUnequip,
  context,
}) {
  const actions = {
    unknownFragment: {
      label: "Identify",
      handler: onIdentification,
    },
    fragmentStacks: {
      label: "Craft",
      handler: onCraft,
    },
    equipment: {
      label: context === "character" ? "Unequip" : "Equip",
      handler: context === "character" ? onUnequip : onEquip,
    },
  };

  const action = actions[item.type];

  const handleAction = () => {
    action?.handler?.();

    onClose();
  };

  return (
    <div className="cell__modal">
      <div className="cell__wrapper">
        <h2 className="cell__preview-name">{item?.name || item?.type}</h2>
        <div className="cell__preview">
          {null || <CellContent item={item} showCount={false} />}
        </div>

        <div className="cell__info">
          <h3 className="cell__info-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>

          <h2 className="cell__info-count">Count: {item?.count || 1}</h2>
          <button className="cell__info-button" onClick={() => handleAction()}>
            {action.label}
          </button>
        </div>
      </div>
      <button onClick={() => onClose()} className="cell__modal-close">
        X
      </button>
    </div>
  );
}
