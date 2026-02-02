import { useBoard } from "../../hooks/useBoard";
import { useSelectedCell } from "../../hooks/useSelectedCell";
import { useSkill } from "../../hooks/useSkill";
import { useGameMode } from "../../hooks/useGameMode";
import "./Match3Board.scss";

import Board from "../board/Board";
import BoardBackground from "../boardBackground/BoardBackground";

export default function Match3Board({ character, params, level }) {
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

      <div className="match3__skills">
        {character.skills.map((skill) => (
          <button
            key={skill.id}
            className="match3__skill-button"
            disabled={
              skill.charges <= 0 || isBoardBlocked || boardApi.levelStatus
            }
            onClick={() => onSkillClick(skill)}
          >
            {skill.name} ({skill.charges})
          </button>
        ))}
      </div>

      <div className="match3Board" style={{ position: "relative" }}>
        <BoardBackground mask={params.mask} />
        <Board
          boardApi={boardApi}
          selectedCellApi={selectedCellApi}
          onCellClick={onCellClick}
        />
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
