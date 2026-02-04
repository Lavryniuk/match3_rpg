import { useBoard } from "../../hooks/useBoard";
import { useSelectedCell } from "../../hooks/useSelectedCell";
import { useSkill } from "../../hooks/useSkill";
import { useGameMode } from "../../hooks/useGameMode";
import "./Match3Board.scss";

import Board from "../board/Board";
import BoardBackground from "../boardBackground/BoardBackground";
import BoardSkills from "../boardSkills/BoardSkills";
import BoardModal from "../boardModal/BoardModal";
import { useState } from "react";

import skillDeck from "../../assets/bg/skillDeck2.png";
import gearIcon from "../../assets/icons/menu_gear.png";

export default function Match3Board({ character, params, level }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);

  const boardApi = useBoard(params);
  const skillApi = useSkill(boardApi.applyUpdateGameState);
  const selectedCellApi = useSelectedCell(boardApi.handleSwap);
  const {
    mode,
    activeSkill,
    onSkillClick,
    onCellClick,
    onPatternSelect,
    isBoardBlocked,
  } = useGameMode(level, character, boardApi, skillApi, selectedCellApi);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="match3">
      <h2 className="match3__title">Match-3 MVP</h2>

      <div className="match3__info">
        <p>Level {level}</p>
        <p>
          Character: {character.name} ({character.class})
        </p>
        <p>Moves left: {boardApi.movesLeft}</p>
        <p>
          Collected {params.targetColor}: {boardApi.collected}/
          {params.targetAmount}
        </p>
        {boardApi.levelStatus && (
          <p className="match3__status">
            Status: {boardApi.levelStatus.toUpperCase()}
          </p>
        )}
      </div>

      <div className="match3Board">
        <BoardBackground mask={params.mask} />
        <Board
          boardApi={boardApi}
          selectedCellApi={selectedCellApi}
          onCellClick={onCellClick}
        />
      </div>

      <div className="match3__skills">
        <img src={skillDeck} alt="" className="skills-bg" />
        <BoardSkills
          character={character}
          levelStatus={boardApi.levelStatus}
          isBoardBlocked={isBoardBlocked}
          onSkillClick={onSkillClick}
        />
      </div>

      {!isModalOpen && (
        <div className="match3__menu" onClick={openModal}>
          <button className="match3__menu-button">
            <img src={gearIcon} alt="gearIcon" />
          </button>
        </div>
      )}

      <div className="match3__modal">
        {isModalOpen && (
          <BoardModal isOpen={isModalOpen} closeModal={closeModal} />
        )}
      </div>

      {mode === "pattern-selection" && activeSkill.patterns && (
        <div className="match3__pattern-modal">
          <h3 className="match3__pattern-title">Select a pattern</h3>
          <div className="match3__pattern-buttons">
            {activeSkill.patterns.map((pattern, index) => (
              <button
                key={index}
                onClick={() => onPatternSelect(pattern)}
                className="match3__pattern-button"
              >
                Pattern {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
