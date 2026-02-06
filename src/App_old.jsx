import { useState } from "react";
import MapRoad from "./components/mapRoad/MapRoad";
import Match3Board from "./components/match3Board/Match3Board";
import LevelAndCharacterModal from "./components/levelAndCharacterModal/LevelAndCharacterModal";
import { levels } from "./data/levels";

function App_old() {
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [levelNumber, setLevelNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const onStartLevel = (level) => {
    setLevelNumber(level);
    setShowLevelModal(true);
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleStartGame = () => {
    setShowLevelModal(false);
    setGameStarted(true);
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      {!gameStarted && <MapRoad onStartLevel={onStartLevel} />}

      {showLevelModal && (
        <LevelAndCharacterModal
          level={levelNumber}
          selectedCharacter={selectedCharacter}
          onCharacterSelect={handleCharacterSelect}
          onClose={() => {
            setShowLevelModal(false);
            setSelectedCharacter(null);
          }}
          onStart={handleStartGame}
        />
      )}

      {selectedCharacter && !showLevelModal && (
        <Match3Board
          character={selectedCharacter}
          params={levels[levelNumber]}
          level={levelNumber}
        />
      )}
    </div>
  );
}

export default App_old;
