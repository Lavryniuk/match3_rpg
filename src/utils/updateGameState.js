import * as BoardUtils from "./boardUtils";

export function updateGameState(params) {
  const {
    collectedOverride = null,
    rawBoard,
    options = {},
    targetAmount,
    targetColor,
    collected,
    movesLeft,
  } = params;

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

  return {
    finalBoard,
    nextCollected,
    nextMoves,
    nextLevelStatus,
  };
}
