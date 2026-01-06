import { Paladin, Sorceress, Archer } from "../../classes/characterClasses";
import "./LevelAndCharacterModal.scss";

export default function LevelAndCharacterModal({
  level,
  selectedCharacter,
  onCharacterSelect,
  onClose,
  onStart,
}) {
  const characters = [
    { name: "Paladin", Class: Paladin },
    { name: "Sorceress", Class: Sorceress },
    { name: "Archer", Class: Archer },
  ];

  return (
    <div className="level-modal">
      <div className="level-modal__content">
        <div className="level-modal__header">
          <h2>Level {level}</h2>
          <button className="level-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="level-modal__reward">Подарок за рекламу</div>

        <div className="level-modal__characters">
          {characters.map((char) => (
            <button
              key={char.name}
              className={`level-modal__character ${
                selectedCharacter?.name === char.name
                  ? "level-modal__character--selected"
                  : ""
              }`}
              onClick={() => onCharacterSelect(new char.Class())}
            >
              {char.name}
            </button>
          ))}
        </div>

        <button
          className="level-modal__start"
          onClick={onStart}
          disabled={!selectedCharacter}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
