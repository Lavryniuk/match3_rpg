import { useState } from "react";
import MapRoad from "./components/mapRoad/MapRoad";
import Match3Board from "./components/match3Board/Match3Board";
import LevelAndCharacterModal from "./components/levelAndCharacterModal/LevelAndCharacterModal";

function App() {
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [levelNumber, setLevelNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  console.log(selectedCharacter);

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
          size={8}
          targetColor="red"
          targetAmount={20}
          movesPerLevel={100}
          level={levelNumber}
        />
      )}
    </div>
  );
}

export default App;
