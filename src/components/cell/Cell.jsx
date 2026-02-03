import { GEMS } from "../../data/gems";
import "./cell.scss";

export default function Cell({
  boardApi,
  selectedCellApi,
  cell,
  row,
  col,
  onCellClick,
}) {
  const isSelected =
    selectedCellApi.selectedCell &&
    selectedCellApi.selectedCell.row === row &&
    selectedCellApi.selectedCell.col === col;

  const isHinted =
    boardApi.hintCells &&
    ((boardApi.hintCells.from.row === row &&
      boardApi.hintCells.from.col === col) ||
      (boardApi.hintCells.to.row === row && boardApi.hintCells.to.col === col));

  const isResolving = boardApi.isResolving;

  const isDisabled = boardApi.movesLeft <= 0 || boardApi.levelStatus;

  const sprite = GEMS[cell.color].sprite;

  return (
    <div
      onClick={() => onCellClick(row, col)}
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
        backgroundImage: `url(${sprite})`,
      }}
    />
  );
}
