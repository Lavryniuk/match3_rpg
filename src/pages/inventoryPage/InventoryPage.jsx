import { useState } from "react";

import { characters } from "../../classes/charactersConfig";

import { itemDB } from "../../data/db/items";

import arrowLeft from "../../assets/icons/arrows/arrow-left.png";
import arrowRight from "../../assets/icons/arrows/arrow-right.png";
import "./inventoryPage.scss";

export default function InventoryPage() {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(1);

  const handlePrevCharacter = () => {
    setSelectedCharacterIndex((i) => (i === 0 ? characters.length - 1 : i - 1));
  };

  const handleNextCharacter = () => {
    setSelectedCharacterIndex((i) => (i === characters.length - 1 ? 0 : i + 1));
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
          {itemDB.map((item) => (
            <div key={item.id} className="inventory__grid-cell"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
