export default class BaseCharacter {
  constructor() {}

  applyDestructiveSkill(board, context) {
    const { centers, pattern } = context;
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    centers.forEach(({ row, col }) => {
      pattern.forEach(([r, c]) => {
        const finalRow = row + r;
        const finalCol = col + c;

        if (newBoard[finalRow]?.[finalCol]) {
          newBoard[finalRow][finalCol].color = null;
        }
      });
    });

    return newBoard;
  }

  applyEntropySkill(board, context) {
    const { cells, color } = context;

    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    cells.forEach(({ row, col }) => {
      if (newBoard[row]?.[col]) {
        newBoard[row][col].color = color;
      }
    });

    return newBoard;
  }

  restoreSkill(board, context) {
    context.options = context.options || {};
    context.options.consumesMove = false;
    context.options.grantsMove = 1;
    return board;
  }
}
