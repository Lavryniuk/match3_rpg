import { useState } from "react";
import * as BoardUtils from "../utils/boardUtils";

export function useBoard(
  size = 8,
  targetColor = "red",
  targetAmount = 10,
  moves = 10
) {
  const [board, setBoard] = useState(() => {
    let newBoard = BoardUtils.createBoard(size);

    while (!BoardUtils.hasAvailableMoves(newBoard)) {
      newBoard = BoardUtils.shuffleBoard(newBoard);
      newBoard = BoardUtils.resolveBoard(newBoard).board;
    }

    return newBoard;
  });

  const [selectedCell, setSelectedCell] = useState(null);
  const [movesLeft, setMovesLeft] = useState(moves);
  const [collected, setCollected] = useState(0);
  const [levelStatus, setLevelStatus] = useState(null);

  function handleCellClick(row, col) {
    if (levelStatus) return;
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
      setMovesLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) setLevelStatus("lost");
        return next;
      });
      return;
    }

    const result = BoardUtils.resolveBoard(swappedBoard);

    const collectedThisMove = result.removed.filter(
      (cell) => cell.color === targetColor
    ).length;

    updateGameState(collectedThisMove, result.board);

    setSelectedCell(null);

    setBoard((currentBoard) => {
      if (!BoardUtils.hasAvailableMoves(currentBoard)) {
        console.log("No moves left, shuffling board...");
        let shuffled = BoardUtils.shuffleBoard(currentBoard);
        const cleaned = BoardUtils.resolveBoard(shuffled);
        return cleaned.board;
      }
      return currentBoard;
    });
  }

  function updateGameState(collectedThisMove = 0, newBoard = board) {
    const nextCollected = collected + collectedThisMove;
    const nextMoves = movesLeft - 1;

    let nextLevelStatus = null;
    if (nextCollected >= targetAmount) {
      nextLevelStatus = "won";
    } else if (nextMoves <= 0) {
      nextLevelStatus = "lost";
    }

    if (!BoardUtils.hasAvailableMoves(newBoard)) {
      console.log("No moves left, shuffling board...");
      const shuffled = BoardUtils.shuffleBoard(newBoard);
      const cleaned = BoardUtils.resolveBoard(shuffled);
      newBoard = cleaned.board;
    }

    setCollected(nextCollected);
    setMovesLeft(nextMoves);
    setBoard(newBoard);
    if (nextLevelStatus) setLevelStatus(nextLevelStatus);
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
