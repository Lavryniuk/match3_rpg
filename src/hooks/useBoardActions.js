import * as BoardUtils from "../utils/boardUtils";

export function useBoardActions(board, applyUpdateGameState) {
  function handleSwap(selectedCell, row, col) {
    const swappedBoard = BoardUtils.swapCells(board, selectedCell, {
      row,
      col,
    });

    if (!BoardUtils.hasAnyMatches(swappedBoard)) {
      applyUpdateGameState(0, board);
      return;
    }

    applyUpdateGameState(null, swappedBoard);
  }

  return { handleSwap };
}
