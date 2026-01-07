import { useBoard } from "../../hooks/useBoard";
import "./Match3Board.scss";

export default function Match3Board({
  character,
  size,
  targetColor,
  targetAmount,
  movesPerLevel,
  level,
}) {
  const {
    board,
    handleCellClick,
    selectedCell,
    movesLeft,
    collected,
    levelStatus,
    addMoves,
    setBoard,
  } = useBoard(size, targetColor, targetAmount, movesPerLevel);

  return (
    <div className="match3">
      <h2 className="match3__title">Match-3 MVP</h2>

      <div className="match3__info">
        <p>Level {level}</p>
        <p>
          Character: {character.name} ({character.class})
        </p>
        <p>Moves left: {movesLeft}</p>
        <p>
          Collected {targetColor}: {collected}/{targetAmount}
        </p>
        {levelStatus && (
          <p className="match3__status">Status: {levelStatus.toUpperCase()}</p>
        )}
      </div>

      <div className="match3__skills">
        {character.skills.map((skill) => (
          <button
            key={skill.id}
            className="match3__skill-button"
            disabled={skill.charges <= 0}
            onClick={() =>
              character.useSkill(skill.id, {
                board,
                setBoard,
                addMoves,
                level,
              })
            }
          >
            {skill.name} ({skill.charges})
          </button>
        ))}
      </div>

      <div
        className="match3__board"
        style={{
          gridTemplateColumns: `repeat(${size}, 40px)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selectedCell &&
              selectedCell.row === rowIndex &&
              selectedCell.col === colIndex;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`match3__cell ${
                  isSelected ? "match3__cell--selected" : ""
                }`}
                style={{
                  background: cell.color,
                  cursor: movesLeft > 0 && !levelStatus ? "pointer" : "default",
                  opacity: movesLeft > 0 || !levelStatus ? 1 : 0.5,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
