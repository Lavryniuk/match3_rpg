import "./boardBackground.scss";

export default function BoardBackground({ mask }) {
  if (!mask || mask.length === 0) return null;

  const numCols = mask[0].length;

  return (
    <div
      className="board-background"
      style={{
        gridTemplateColumns: `repeat(${numCols}, 40px)`,
      }}
    >
      {mask.map((rowMask, rowIndex) =>
        rowMask
          .split("")
          .map((symbol, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`board-background__cell ${
                symbol === "1" ? "filled" : "empty"
              }`}
            />
          ))
      )}
    </div>
  );
}
