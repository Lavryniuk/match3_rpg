export const COLORS = ["red", "blue", "green", "yellow", "purple"];

// random color, excluding given ones
export function getRandomColor(excludedColors = []) {
  const available = COLORS.filter((c) => !excludedColors.includes(c));
  return available[Math.floor(Math.random() * available.length)];
}

// create board without starting matches
export function createBoard(size) {
  const board = Array.from({ length: size }, () => Array(size).fill(null));

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const excludedColors = [];

      if (col >= 2 && board[row][col - 1].color === board[row][col - 2].color) {
        excludedColors.push(board[row][col - 1].color);
      }
      if (row >= 2 && board[row - 1][col].color === board[row - 2][col].color) {
        excludedColors.push(board[row - 1][col].color);
      }

      board[row][col] = { color: getRandomColor(excludedColors) };
    }
  }

  return board;
}

// swap two cells
export function swapCells(board, cellA, cellB) {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  const temp = newBoard[cellA.row][cellA.col];
  newBoard[cellA.row][cellA.col] = newBoard[cellB.row][cellB.col];
  newBoard[cellB.row][cellB.col] = temp;
  return newBoard;
}

// check matches and remove them
export function checkMatches(boardToCheck) {
  const size = boardToCheck.length;
  const toRemove = [];

  // horizontal
  for (let row = 0; row < size; row++) {
    let count = 1;
    for (let col = 1; col < size; col++) {
      if (
        boardToCheck[row][col].color &&
        boardToCheck[row][col].color === boardToCheck[row][col - 1].color
      ) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++)
            toRemove.push({ row, col: col - 1 - k });
        }
        count = 1;
      }
    }
    if (count >= 3)
      for (let k = 0; k < count; k++) toRemove.push({ row, col: size - 1 - k });
  }

  // vertical
  for (let col = 0; col < size; col++) {
    let count = 1;
    for (let row = 1; row < size; row++) {
      if (
        boardToCheck[row][col].color &&
        boardToCheck[row][col].color === boardToCheck[row - 1][col].color
      ) {
        count++;
      } else {
        if (count >= 3)
          for (let k = 0; k < count; k++)
            toRemove.push({ row: row - 1 - k, col });
        count = 1;
      }
    }
    if (count >= 3)
      for (let k = 0; k < count; k++) toRemove.push({ row: size - 1 - k, col });
  }

  if (toRemove.length === 0) return { board: boardToCheck, hasMatches: false };

  const newBoard = boardToCheck.map((row) => row.map((cell) => ({ ...cell })));
  toRemove.forEach(({ row, col }) => (newBoard[row][col] = { color: null }));

  return { board: newBoard, hasMatches: true, toRemove };
}

// are there any matches
export function hasAnyMatches(board) {
  return checkMatches(board).hasMatches;
}

// gravity
export function applyGravity(boardToUpdate) {
  const size = boardToUpdate.length;
  const newBoard = boardToUpdate.map((row) => row.map((cell) => ({ ...cell })));

  for (let col = 0; col < size; col++) {
    for (let row = size - 1; row >= 0; row--) {
      if (!newBoard[row][col].color) {
        let r = row - 1;
        while (r >= 0 && !newBoard[r][col].color) r--;
        if (r >= 0) {
          newBoard[row][col] = newBoard[r][col];
          newBoard[r][col] = { color: null };
        } else {
          newBoard[row][col] = {
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          };
        }
      }
    }
  }

  return newBoard;
}

// fully resolve board with cascades
export function resolveBoard(board) {
  let currentBoard = board;
  let hasMatches = true;

  while (hasMatches) {
    const result = checkMatches(currentBoard);
    hasMatches = result.hasMatches;
    currentBoard = result.board;
    if (hasMatches) currentBoard = applyGravity(currentBoard);
  }

  return currentBoard;
}
