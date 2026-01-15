import { useState } from "react";
import * as BoardUtils from "../utils/boardUtils";

export function useBoard(
  size = 8,
  targetColor = "red",
  targetAmount = 10,
  moves = 100
) {
  const [board, setBoard] = useState(() => {
    let newBoard = BoardUtils.createBoard(size);

    while (!BoardUtils.hasAvailableMoves(newBoard)) {
      newBoard = BoardUtils.shuffleBoard(newBoard);
      newBoard = BoardUtils.resolveBoard(newBoard).board;
    }

    return newBoard;
  });

  const [movesLeft, setMovesLeft] = useState(moves);
  const [collected, setCollected] = useState(0);
  const [levelStatus, setLevelStatus] = useState(null);

  function handleSwap(selectedCell, row, col) {
    if (levelStatus) return;
    if (movesLeft <= 0) return;

    const swappedBoard = BoardUtils.swapCells(board, selectedCell, {
      row,
      col,
    });

    if (!BoardUtils.hasAnyMatches(swappedBoard)) {
      updateGameState(0, board);
      return;
    }

    updateGameState(null, swappedBoard);
  }

  function updateGameState(collectedOverride = null, rawBoard, options = {}) {
    const { consumesMove = true, grantsMove = 0 } = options;
    console.log(rawBoard);
    const boardAfterGravity = BoardUtils.applyGravity(rawBoard);
    console.log(boardAfterGravity);

    const { board: resolvedBoard, removed } =
      BoardUtils.resolveBoard(boardAfterGravity);
    console.log(resolvedBoard);
    console.log(removed);

    const collectedThisMove =
      collectedOverride !== null
        ? collectedOverride
        : removed.filter((cell) => cell.color === targetColor).length;

    const nextCollected = collected + collectedThisMove;

    let nextMoves = consumesMove ? movesLeft - 1 : movesLeft;
    nextMoves += grantsMove;

    let nextLevelStatus = null;
    if (nextCollected >= targetAmount) nextLevelStatus = "won";
    else if (nextMoves <= 0) nextLevelStatus = "lost";

    if (!BoardUtils.hasAvailableMoves(resolvedBoard)) {
      const shuffled = BoardUtils.shuffleBoard(resolvedBoard);
      finalBoard = BoardUtils.resolveBoard(shuffled).board;
    }

    //test
    const matchResult = BoardUtils.checkMatches(resolvedBoard);
    console.log(matchResult.hasMatches);

    setCollected(nextCollected);
    setMovesLeft(nextMoves);
    setBoard(resolvedBoard);
    if (nextLevelStatus) setLevelStatus(nextLevelStatus);
  }

  return {
    board,
    handleSwap,
    movesLeft,
    collected,
    levelStatus,
    updateGameState,
  };
}
