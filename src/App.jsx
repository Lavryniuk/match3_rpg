// App.jsx
import { useBoard } from "./hooks/useBoard";

const SIZE = 8;
const TARGET_COLOR = "red"; // цвет цели уровня
const TARGET_AMOUNT = 10; // сколько блоков собрать
const MOVES_PER_LEVEL = 10; // количество ходов

export default function App() {
  const {
    board,
    handleCellClick,
    selectedCell,
    movesLeft,
    collected,
    levelStatus,
  } = useBoard(SIZE, TARGET_COLOR, TARGET_AMOUNT, MOVES_PER_LEVEL);

  return (
    <div style={{ padding: 20 }}>
      <h2>Match-3 MVP</h2>
      <p>Moves left: {movesLeft}</p>
      <p>
        Collected {TARGET_COLOR}: {collected}/{TARGET_AMOUNT}
      </p>
      {levelStatus && <p>Status: {levelStatus.toUpperCase()}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 40px)`,
          gap: 4,
          marginTop: 20,
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
                style={{
                  width: 40,
                  height: 40,
                  background: cell.color,
                  border: isSelected ? "3px solid white" : "1px solid #333",
                  boxSizing: "border-box",
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
