export default class BaseCharacter {
  constructor() {
    (this.name = ""), (this.class = ""), (this.skills = []);
  }

  getSkill(skillId) {
    return this.skills.find((skill) => skill.id === skillId);
  }

  canUseSkill(skillId) {
    const skill = this.getSkill(skillId);
    return skill && skill.charges > 0;
  }

  getCenters(size, centersAmount) {
    const result = this.getRandomCells(size, centersAmount);

    return result;
  }

  applyDestructiveSkill(board, level, patterns, centersAmount) {
    const size = board.length;
    if (level >= 31) return board;

    const centersArray = this.getCenters(size, centersAmount);

    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    for (let i = 0; i < centersAmount; i++) {
      const { row, col } = centersArray[i];

      const pattern = this.getRandomPattern(patterns);

      pattern.forEach(([r, c]) => {
        const finalRow = row + r;
        const finalCol = col + c;

        if (newBoard[finalRow]?.[finalCol]) {
          newBoard[finalRow][finalCol].color = null;
        }
      });
    }

    console.log(newBoard);

    return newBoard;
  }

  getRandomPattern(patterns) {
    if (patterns[0].length === 2) {
      return patterns;
    }

    const random = Math.floor(Math.random() * patterns.length);

    return patterns[random];
  }

  applyEntropySkill(board, level, skillResult) {
    const size = board.length;
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    const cells = level < 31 ? this.getRandomCells(size, 5) : [];

    cells.forEach(({ row, col }) => {
      if (newBoard[row]?.[col]) {
        newBoard[row][col].color = skillResult;
      }
    });

    return newBoard;
  }

  restoreSkill(board, level, context) {
    context.options = context.options || {};
    context.options.consumesMove = false;
    context.options.grantsMove = 1;
    return board;
  }

  getRandomCell(size) {
    return {
      row: Math.floor(Math.random() * size),
      col: Math.floor(Math.random() * size),
    };
  }

  getRandomCells(size, amount) {
    const result = [];

    while (result.length < amount) {
      const cell = this.getRandomCell(size);

      const alreadyExists = result.some(
        (c) => c.row === cell.row && c.col === cell.col
      );

      if (!alreadyExists) {
        result.push(cell);
      }
    }

    return result;
  }

  getRandomColor() {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
