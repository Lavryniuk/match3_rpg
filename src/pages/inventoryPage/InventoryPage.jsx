import { useState } from "react";

import { identifyFragment, craftItem } from "../../utils/inventoryUtils";
import { useGame } from "../../game/GameProvider";

import { equipmentsDB } from "../../data/db/equipments";
import { CHARCLASSES } from "../../data/db/charClasses";
import { characters } from "../../classes/charactersConfig";

import { InventoryCharacterPanel } from "../../components/inventoryCharacterPanel/InventoryCharacterPanel";
import { Inventory } from "../../components/inventory/Inventory";
import { InventoryCellModal } from "../../components/inventoryCell/inventoryCellModal/InventoryCellModal";

import "./inventoryPage.scss";

export default function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(1);
  const [context, setContext] = useState(null);

  const {
    addFragment,
    scrolls,
    useScroll,
    removeUnknownFragment,
    removeFragments,
    addEquipment,
    equipItem,
    unequipItem,
    charactersInventory,
  } = useGame();

  const selectedCharacter = characters[selectedCharacterIndex];

  function showModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onSelectCell(item, context) {
    if (!item) return;

    setSelectedItem(item);
    setContext(context);

    showModal();
  }

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

  const onEquip = ({ item, charId }) => {
    equipItem({ item, charId });
  };

  const onUnequip = ({ slot, charId }) => {
    unequipItem({ slot, charId });
  };

  const handlePrevCharacter = () => {
    setSelectedCharacterIndex((i) => (i === 0 ? characters.length - 1 : i - 1));
  };

  const handleNextCharacter = () => {
    setSelectedCharacterIndex((i) => (i === characters.length - 1 ? 0 : i + 1));
  };

  console.log(selectedCharacter.id, selectedItem);

  return (
    <div className="inventory">
      <InventoryCharacterPanel
        selectedCharacter={selectedCharacter}
        handlePrevCharacter={handlePrevCharacter}
        handleNextCharacter={handleNextCharacter}
        onSelectCell={onSelectCell}
        currentInventory={charactersInventory[selectedCharacter.id]}
      />
      <Inventory onSelectCell={onSelectCell} />

      {isModalOpen && (
        <InventoryCellModal
          item={selectedItem}
          onClose={closeModal}
          onIdentification={() =>
            onIdentification({
              fragment: selectedItem,
              addFragment,
              removeUnknownFragment,
              scrolls,
              useScroll,
            })
          }
          onCraft={() =>
            onCraft({
              fragment: selectedItem,
              removeFragments,
              addEquipment,
              equipments: equipmentsDB,
              charClasses: CHARCLASSES,
            })
          }
          onEquip={() =>
            onEquip({ item: selectedItem, charId: selectedCharacter.id })
          }
          onUnequip={() =>
            onUnequip({ slot: selectedItem.slot, charId: selectedCharacter.id })
          }
          context={context}
        />
      )}
    </div>
  );
}
