import BaseCharacter from "./BaseCharacter";

export default class Archer extends BaseCharacter {
  constructor() {
    super();

    this.name = "Elandor";
    this.class = "Archer";

    this.skills = [
      {
        id: "arrowShot",
        name: "Arrow Shot",
        charges: 100,
        effect: this.arrowShot,
      },
      {
        id: "arrowBarrage",
        name: "Arrow Barrage",
        charges: 100,
        effect: this.arrowBarrage,
      },
      {
        id: "shadow",
        name: "Shadow",
        charges: 100,
        effect: this.shadow,
      },
    ];
  }

  arrowShot = (board, level, context) => {
    //pattern for archer

    const pattern = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [-2, 0],
      [2, 0],
    ];

    const centersAmount = 1;

    return this.applyDestructiveSkill(board, level, pattern, centersAmount);
  };

  arrowBarrage = (board, level, context) => {
    const skillResult = null;
    return this.applyEntropySkill(board, level, skillResult);
  };

  shadow = (board, level, context) => {
    return this.restoreSkill(board, level, context);
  };

  // applyDestructiveSkill(board, level, pattern) {
  //   const size = board.length;
  //   if (level >= 31) return board;

  //   const { row, col } = this.getRandomCell(size);
  //   const newBoard = board.map((r) => r.map((c) => ({ ...c })));

  //   pattern.forEach(([r, c]) => {
  //     const finalRow = row + r;
  //     const finalCol = col + c;

  //     if (newBoard[finalRow]?.[finalCol]) {
  //       newBoard[finalRow][finalCol].color = null;
  //     }
  //   });

  //   console.log(newBoard);

  //   return newBoard;
  // }

  // getRandomCells(size, amount) {
  //   const result = [];

  //   for (let i = 0; i < amount; i++) {
  //     result.push(this.getRandomCell(size));
  //   }

  //   for (let i = 0; i < amount; i++) {
  //     const randomCell = this.getRandomCell(size);
  //     for (let j = 0; j < result.length; j++) {
  //       if (randomCell !== result[j]) {
  //         result.push(randomCell);
  //       }
  //     }
  //   }

  //   return result;
  // }
}
