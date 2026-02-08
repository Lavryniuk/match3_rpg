import { useState } from "react";
import { useGame } from "../../game/GameProvider";

import { getReward } from "../../utils/inventoryUtils";
import { RARITIES } from "../../data/db/rarities";
import { SLOTS } from "../../data/db/slots";
import { fragmentsDB } from "../../data/db/fragments";

import { characters } from "../../classes/charactersConfig";

import arrowLeft from "../../assets/icons/arrows/arrow-left.png";
import arrowRight from "../../assets/icons/arrows/arrow-right.png";
import "./inventoryPage.scss";

export default function InventoryPage() {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(1);

  const { fragmentsInventory, itemsInventory, addFragment, addCoins } =
    useGame();

  const inventoryToRender = [
    ...fragmentsInventory.filter((f) => f.type === "fragment"),
    ...itemsInventory.filter((i) => i.type === "item"),
  ];

  // const handlePrevCharacter = () => {
  //   setSelectedCharacterIndex((i) => (i === 0 ? characters.length - 1 : i - 1));
  // };

  const handleNextCharacter = () => {
    setSelectedCharacterIndex((i) => (i === characters.length - 1 ? 0 : i + 1));
  };

  //todo remove
  const handlePrevCharacter = () => {
    getReward({
      levelCoinAmount: 50,
      rarities: RARITIES,
      slots: SLOTS,
      fragments: fragmentsDB,
      addCoins,
      addFragment,
    });
  };

  const selectedCharacter = characters[selectedCharacterIndex];

  return (
    <div className="inventory">
      <div className="inventory__character-panel">
        <div className="inventory__character-card">
          <img
            src={selectedCharacter.inventoryAvatar}
            alt={selectedCharacter.name}
            className="inventory__character-avatar"
          />
          <div className="inventory__character-info">
            <h2>{selectedCharacter.name}</h2>
            <p className="inventory__character-info-class">
              {selectedCharacter.class}
            </p>
            <p className="inventory__character-info-bio">
              {selectedCharacter.bio}
            </p>
          </div>
        </div>

        <div className="inventory__character-arrows">
          <button
            className="inventory__character-arrow"
            onClick={handlePrevCharacter}
          >
            <img src={arrowLeft} alt="arrowLeft" />
          </button>
          <button
            className="inventory__character-arrow"
            onClick={handleNextCharacter}
          >
            <img src={arrowRight} alt="arrowRight" />
          </button>
        </div>
      </div>

      <div className="inventory__grid-wrapper">
        <h2 className="inventory__grid-name">Inventory</h2>
        <div className="inventory__grid">
          {inventoryToRender.map((item) => (
            <div key={item.id} className="inventory__grid-cell">
              <img src={item.icon} alt={item.id} />
              <div>{item.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
