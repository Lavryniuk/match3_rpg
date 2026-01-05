import { useState } from "react";
import * as BoardUtils from "../utils/boardUtils";

export function useBoard(
  size = 8,
  targetColor = "red",
  targetAmount = 10,
  moves = 10
) {
  const [board, setBoard] = useState(BoardUtils.createBoard(size));
  const [selectedCell, setSelectedCell] = useState(null);
  const [movesLeft, setMovesLeft] = useState(moves);
  const [collected, setCollected] = useState(0);
  const [levelStatus, setLevelStatus] = useState(null); // "won" / "lost"

  function handleCellClick(row, col) {
    if (levelStatus) return; // уровень завершён
    if (movesLeft <= 0) {
      setLevelStatus("lost");
      return;
    }

    if (!selectedCell) {
      setSelectedCell({ row, col });
      return;
    }

    if (selectedCell.row === row && selectedCell.col === col) {
      setSelectedCell(null);
      return;
    }

    const isNeighbour =
      Math.abs(selectedCell.row - row) + Math.abs(selectedCell.col - col) === 1;

    if (!isNeighbour) {
      setSelectedCell({ row, col });
      return;
    }

    const swappedBoard = BoardUtils.swapCells(board, selectedCell, {
      row,
      col,
    });

    if (!BoardUtils.hasAnyMatches(swappedBoard)) {
      setSelectedCell(null);
      setMovesLeft((prev) => prev - 1);
      if (movesLeft - 1 <= 0) setLevelStatus("lost");
      return;
    }

    // Считаем реальные совпадения 3+ для targetColor
    const matchResult = BoardUtils.checkMatches(swappedBoard);

    const collectedThisMove = matchResult.toRemove.filter(
      ({ row, col }) => swappedBoard[row][col].color === targetColor
    ).length;

    // Полная визуальная обработка каскадов
    const resolvedBoard = BoardUtils.resolveBoard(swappedBoard);

    setBoard(resolvedBoard);
    setCollected((prev) => {
      const total = prev + collectedThisMove;
      if (total >= targetAmount) setLevelStatus("won");
      return total;
    });

    setSelectedCell(null);
    setMovesLeft((prev) => {
      const next = prev - 1;
      if (next <= 0 && collected + collectedThisMove < targetAmount)
        setLevelStatus("lost");
      return next;
    });
  }

  return {
    board,
    handleCellClick,
    selectedCell,
    movesLeft,
    collected,
    levelStatus,
  };
}
