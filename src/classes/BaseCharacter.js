export default class BaseCharacter {
  constructor() {}

  applyDestructiveSkill(board, context) {
    const { centers, patterns } = context;
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    centers.forEach((center, i) => {
      const patternToApply = patterns.length === 1 ? patterns[0] : patterns[i];

      patternToApply.forEach(([r, c]) => {
        const finalRow = center.row + r;
        const finalCol = center.col + c;

        if (newBoard[finalRow]?.[finalCol]) {
          newBoard[finalRow][finalCol].color = null;
        }
      });
    });

    return newBoard;
  }

  applyEntropySkill(board, context) {
    const { cells, colors } = context;

    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    cells.forEach((cell, i) => {
      if (newBoard[cell.row]?.[cell.col]) {
        newBoard[cell.row][cell.col].color =
          colors.length === 1 ? colors[0] : colors[i];
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
