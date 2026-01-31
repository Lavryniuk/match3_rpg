import { useState } from "react";
import * as BoardUtils from "../utils/boardUtils";

import { useHint } from "./useHint";
import { updateGameState } from "../utils/updateGameState";
import { useAnimationsFSM } from "./useAnimationsFSM";
import { useBoardActions } from "./useBoardActions";

export function useBoard(
  size = 8,
  targetColor = "red",
  targetAmount = 10,
  moves = 100
) {
  const [board, setBoard] = useState(() => {
    let newBoard = BoardUtils.createBoard(size);

    let hasAvailableMoves = BoardUtils.findAvailableMoves(newBoard);

    while (!hasAvailableMoves.hasMoves) {
      newBoard = BoardUtils.shuffleBoard(newBoard);
      newBoard = BoardUtils.resolveBoard(newBoard).board;
      hasAvailableMoves = BoardUtils.findAvailableMoves(newBoard);
    }

    return newBoard;
  });

  const [movesLeft, setMovesLeft] = useState(moves);
  const [collected, setCollected] = useState(0);
  const [levelStatus, setLevelStatus] = useState(null);
  const [hintCells, setHintCells] = useState(null);

  const [gamePhase, setGamePhase] = useState("idle");
  const [isResolving, setIsResolving] = useState(false);

  const {
    onAnimationStart,
    onAnimationEnd,
    interruptHint,
    setOwner,
    hasUserInteracted,
  } = useAnimationsFSM(setGamePhase, setIsResolving, setHintCells);

  useHint({ board, gamePhase, hasUserInteracted, levelStatus, setHintCells });

  function applyUpdateGameState(collectedOverride, rawBoard, options) {
    const result = updateGameState({
      collectedOverride,
      rawBoard,
      options,
      targetAmount,
      targetColor,
      collected,
      movesLeft,
    });

    setCollected(result.nextCollected);
    setMovesLeft(result.nextMoves);
    setBoard(result.finalBoard);
    setIsResolving(true);
    if (result.nextLevelStatus) {
      setLevelStatus(result.nextLevelStatus);
      setOwner("finished");
    }
  }

  const { handleSwap } = useBoardActions(board, applyUpdateGameState);

  return {
    board,
    handleSwap,
    movesLeft,
    collected,
    levelStatus,
    hintCells,
    applyUpdateGameState,
    onAnimationStart,
    onAnimationEnd,
    gamePhase,
    isResolving,
    interruptHint,
  };
}
