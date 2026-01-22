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
  console.log(gamePhase);

  const animationsCountRef = useRef(0);
  console.log(animationsCountRef);

  const animationOwnerRef = useRef(null);

  const hintShowTimer = useRef(null);
  const hintHideTimer = useRef(null);

  useEffect(() => {
    if (gamePhase !== "hinted" || !hasUserInteracted || levelStatus) return;
    console.log("effect start");

    hintShowTimer.current = setTimeout(() => {
      const move = BoardUtils.findAvailableMoves(board);
      if (!move.hasMoves) return;

      setHintCells({ from: move.from, to: move.to });

      hintHideTimer.current = setTimeout(() => {
        setHintCells(null);
      }, 3100);
    }, 5000);

    return () => {
      clearTimeout(hintShowTimer.current);
      clearTimeout(hintHideTimer.current);
    };
  }, [gamePhase]);

  function onAnimationStart() {
    animationsCountRef.current += 1;
    setGamePhase("animating");
  }

  function onAnimationEnd() {
    animationsCountRef.current -= 1;

    if (animationsCountRef.current > 0) return;

    animationsCountRef.current = 0;

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

  function handleSwap(selectedCell, row, col) {
    if (levelStatus) return;
    if (movesLeft <= 0) return;

    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    setGamePhase("action");
    animationOwnerRef.current = "resolving";
    setIsResolving(true);

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

    let finalBoard = resolvedBoard;

    const move = BoardUtils.findAvailableMoves(resolvedBoard);

    if (!move.hasMoves) {
      const shuffled = BoardUtils.shuffleBoard(resolvedBoard);
      finalBoard = BoardUtils.resolveBoard(shuffled).board;
    }

    //test
    const matchResult = BoardUtils.checkMatches(finalBoard);
    console.log(matchResult.hasMatches);

    setCollected(nextCollected);
    setMovesLeft(nextMoves);
    setBoard(finalBoard);
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
  };
}
