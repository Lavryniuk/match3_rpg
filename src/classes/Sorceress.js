import BaseCharacter from "./BaseCharacter";

export default class Sorceress extends BaseCharacter {
  constructor() {
    super();

    this.name = "Cortana";
    this.class = "Sorceress";

    this.skills = [
      {
        id: "meteor",
        name: "Meteor",
        charges: 1,
        effect: this.meteor,
      },
      {
        id: "realityDistortionr",
        name: "Reality Distortion",
        charges: 1,
        effect: this.realityDistortion,
      },
      {
        id: "manaRestore",
        name: "Mana Restore",
        charges: 1,
        effect: this.manaRestore,
      },
    ];
  }

  meteor = ({ board, setBoard, level }) => {
    const size = board.length;

    const center = level < 31 ? this.getRandomCell(size) : null;

    if (!center) return;

    this.applyMeteor(board, setBoard, center);
  };

  applyMeteor(board, setBoard, center) {
    const { row, col } = center;

    const positions = [
      [row, col],
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    positions.forEach(([r, c]) => {
      if (newBoard[r]?.[c]) {
        newBoard[r][c].color = null;
      }
    });

    setBoard(newBoard);
  }

  realityDistortion = ({ board, setBoard, level }) => {
    const size = board.length;
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    const cells = level < 31 ? this.getRandomCells(size, 5) : [];

    cells.forEach(({ row, col }) => {
      if (newBoard[row]?.[col]) {
        newBoard[row][col].color = this.getRandomColor();
      }
    });

    setBoard(newBoard);
  };

  manaRestore = ({ addMoves }) => {
    addMoves(1);
  };

  getRandomCell(size) {
    return {
      row: Math.floor(Math.random() * size),
      col: Math.floor(Math.random() * size),
    };
  }

  getRandomCells(size, amount) {
    const result = [];

    for (let i = 0; i < amount; i++) {
      result.push(this.getRandomCell(size));
    }

    return result;
  }

  getRandomColor() {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
