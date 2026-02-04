import Cell from "../cell/Cell";

import "./board.scss";

export default function Board({ boardApi, selectedCellApi, onCellClick }) {
  const board = boardApi.board;
  if (!board) return null;

  const numCols = board[0].length;

  return (
    <div
      className="match3__board"
      style={{
        gridTemplateColumns: `repeat(${numCols}, 50px)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell.blocked) {
            return <div key={`${rowIndex}-${colIndex}`} />;
          }

          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              boardApi={boardApi}
              selectedCellApi={selectedCellApi}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              onCellClick={onCellClick}
            />
          );
        })
      )}
    </div>
  );
}
