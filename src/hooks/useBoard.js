import { useEffect, useState, useRef } from "react";
import * as BoardUtils from "../utils/boardUtils";

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

  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  const [gamePhase, setGamePhase] = useState("idle");

  const resolveAnimationsRef = useRef(0);
  const hintAnimationsRef = useRef(0);

  const animationOwnerRef = useRef(null);

  const hintShowTimer = useRef(null);

  useEffect(() => {
    if (gamePhase !== "hinted") return;
    if (!hasUserInteracted || levelStatus) return;

    hintShowTimer.current = setTimeout(() => {
      const move = BoardUtils.findAvailableMoves(board);
      if (!move.hasMoves) return;

      setHintCells({ from: move.from, to: move.to });
    }, 8000);

    return () => {
      clearTimeout(hintShowTimer.current);
    };
  }, [gamePhase]);

  function onAnimationStart() {
    if (animationOwnerRef.current === "resolving") {
      resolveAnimationsRef.current += 1;
    }

    if (animationOwnerRef.current === "hint") {
      hintAnimationsRef.current += 1;
    }

    setGamePhase("animating");
  }

  function onAnimationEnd() {
    if (animationOwnerRef.current === "resolving") {
      resolveAnimationsRef.current -= 1;
    }

    if (animationOwnerRef.current === "hint") {
      hintAnimationsRef.current -= 1;
    }

    if (resolveAnimationsRef.current > 0 || hintAnimationsRef.current > 0)
      return;

    resolveAnimationsRef.current = 0;
    hintAnimationsRef.current = 0;

    if (animationOwnerRef.current === "finished") {
      setIsResolving(false);
      setGamePhase("finished");
      animationOwnerRef.current = null;
      return;
    }

    if (animationOwnerRef.current === "resolving") {
      animationOwnerRef.current = "hint";
      setIsResolving(false);
      setGamePhase("hinted");
      return;
    }

    if (animationOwnerRef.current === "hint") {
      animationOwnerRef.current = null;
      setGamePhase("idle");
    }
  }

  // FSM stays in "action" until animationEnd resets it; even if a cell click or skill is cancelled, it only changes after a userAction triggers an animation.
  function interruptHint() {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    setGamePhase("action");

    if (animationOwnerRef.current === "hint") {
      animationOwnerRef.current = null;
      hintAnimationsRef.current = 0;
      setHintCells(null);
    }

    animationOwnerRef.current = "resolving";
  }

  function handleSwap(selectedCell, row, col) {
    if (levelStatus) return;
    if (movesLeft <= 0) return;

    interruptHint();

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
    const boardAfterGravity = BoardUtils.applyGravity(rawBoard);

    const { board: resolvedBoard, removed } =
      BoardUtils.resolveBoard(boardAfterGravity);

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

    let finalBoard = resolvedBoard;

    const move = BoardUtils.findAvailableMoves(resolvedBoard);

    if (!move.hasMoves) {
      const shuffled = BoardUtils.shuffleBoard(resolvedBoard);
      finalBoard = BoardUtils.resolveBoard(shuffled).board;
    }

    setCollected(nextCollected);
    setMovesLeft(nextMoves);
    setBoard(finalBoard);
    setIsResolving(true);
    if (nextLevelStatus) {
      setLevelStatus(nextLevelStatus);
      animationOwnerRef.current = "finished";
    }
  }

  return {
    board,
    handleSwap,
    movesLeft,
    collected,
    levelStatus,
    hintCells,
    updateGameState,
    onAnimationStart,
    onAnimationEnd,
    gamePhase,
    isResolving,
    interruptHint,
  };
}
