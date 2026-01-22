import { useBoard } from "../../hooks/useBoard";
import { useSelectedCell } from "../../hooks/useSelectedCell";
import { useSkill } from "../../hooks/useSkill";
import { useGameMode } from "../../hooks/useGameMode";
import "./Match3Board.scss";

export default function Match3Board({
  character,
  size,
  targetColor,
  targetAmount,
  movesPerLevel,
  level,
}) {
  const boardApi = useBoard(size, targetColor, targetAmount, movesPerLevel);
  const skillApi = useSkill(boardApi.updateGameState);
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
          Collected {targetColor}: {boardApi.collected}/{targetAmount}
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

      <div
        className="match3__board"
        style={{ gridTemplateColumns: `repeat(${size}, 40px)` }}
      >
        {boardApi.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selectedCellApi.selectedCell &&
              selectedCellApi.selectedCell.row === rowIndex &&
              selectedCellApi.selectedCell.col === colIndex;

            const isHinted =
              boardApi.hintCells &&
              ((boardApi.hintCells.from.row === rowIndex &&
                boardApi.hintCells.from.col === colIndex) ||
                (boardApi.hintCells.to.row === rowIndex &&
                  boardApi.hintCells.to.col === colIndex));

            const isResolving = boardApi.isResolving;

            const isDisabled = boardApi.movesLeft <= 0 || boardApi.levelStatus;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
                className={`
                  match3__cell
                  ${isSelected ? "match3__cell__selected" : ""}
                  ${isHinted ? "match3__cell__hinted" : ""}
                  ${isResolving ? "match3__cell__resolving" : ""}
                  ${isDisabled ? "match3__cell__disabled" : ""}
                `}
                onAnimationStart={() => {
                  if (isResolving || isHinted) {
                    boardApi.onAnimationStart();
                  }
                }}
                onAnimationEnd={() => {
                  if (isResolving || isHinted) {
                    boardApi.onAnimationEnd();
                  }
                }}
                style={{
                  background: cell.color,
                }}
              />
            );
          })
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
