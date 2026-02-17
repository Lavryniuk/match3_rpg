import { useState } from "react";

import { characters } from "../../classes/charactersConfig";

import arrowLeft from "../../assets/icons/arrows/arrow-left.png";
import arrowRight from "../../assets/icons/arrows/arrow-right.png";

import "./inventoryCharacterPanel.scss";
import { FrontCard } from "./frontCard";
import { BackCard } from "./backCard";

export function InventoryCharacterPanel() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(1);

  function toggleFlip() {
    setIsFlipped((prev) => !prev);
  }

  const handlePrevCharacter = () => {
    setSelectedCharacterIndex((i) => (i === 0 ? characters.length - 1 : i - 1));
  };

  const handleNextCharacter = () => {
    setSelectedCharacterIndex((i) => (i === characters.length - 1 ? 0 : i + 1));
  };

  const selectedCharacter = characters[selectedCharacterIndex];
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
        <BackCard />
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
