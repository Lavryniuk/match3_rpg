import { useState } from "react";

import arrowLeft from "../../assets/icons/arrows/arrow-left.png";
import arrowRight from "../../assets/icons/arrows/arrow-right.png";

import "./inventoryCharacterPanel.scss";
import { FrontCard } from "./frontCard";
import { BackCard } from "./backCard";

export function InventoryCharacterPanel({
  selectedCharacter,
  handlePrevCharacter,
  handleNextCharacter,
  onSelectCell,
  currentInventory,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  function toggleFlip() {
    setIsFlipped((prev) => !prev);
  }

  return (
    <div className="character__panel">
      <div
        className={`character__card ${isFlipped ? "is-flipped" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            toggleFlip();
          }
        }}
      >
        <FrontCard selectedCharacter={selectedCharacter} />
        <BackCard
          onSelectCell={onSelectCell}
          currentInventory={currentInventory}
        />
      </div>

      <div className="character__arrows">
        <button className="character__arrow" onClick={handlePrevCharacter}>
          <img src={arrowLeft} alt="arrowLeft" />
        </button>
        <button className="character__arrow" onClick={handleNextCharacter}>
          <img src={arrowRight} alt="arrowRight" />
        </button>
      </div>
    </div>
  );
}
