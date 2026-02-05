import { fisherShuffle } from "./boardUtils";

export function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function generateRandomColors(count, availableColors) {
  const colors = [];

  for (let i = 0; i < count; i++) {
    colors.push(getRandomColor(availableColors));
  }

  return colors;
}

export function getSkill(character, skillId) {
  return character.skills.find((skill) => skill.id === skillId);
}

export function canUseSkill(character, skillId) {
  const skill = getSkill(character, skillId);
  return skill && skill.charges > 0;
}

export function getRandomCells(board, amount) {
  const availableCells = getAvailableCells(board);
  const shuffled = fisherShuffle([...availableCells]);
  return shuffled.slice(0, amount);
}

export function getAvailableCells(board) {
  const numRows = board.length;
  const numCols = board[0].length;

  const availableCells = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (!board[row][col].blocked) {
        availableCells.push({ row, col });
      }
    }
  }
  return availableCells;
}
