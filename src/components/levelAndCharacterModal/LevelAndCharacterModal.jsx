import { characters } from "../../classes/charactersConfig";
import "./LevelAndCharacterModal.scss";

export default function LevelAndCharacterModal({
  level,
  selectedCharacter,
  onCharacterSelect,
  onClose,
  onStart,
}) {
  return (
    <div className="level-modal">
      <div className="level-modal__content">
        <div className="level-modal__header">
          <h2>Level {level}</h2>
          <button className="level-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="level-modal__reward">Watch Add</div>

        <div className="level-modal__characters">
          {characters.map((char) => (
            <button key={char.id} onClick={() => onCharacterSelect(char)}>
              {char.class}
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
