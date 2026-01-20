export const COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "lime",
  "black",
];

// random color, excluding given ones
export function getRandomColor(excludedColors = []) {
  const available = COLORS.filter((c) => !excludedColors.includes(c));
  return available[Math.floor(Math.random() * available.length)];
}

// create board without starting matches
export function createBoard(size) {
  const board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ color: null }))
  );

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const excludedColors = [];
      if (col >= 2 && board[row][col - 1].color === board[row][col - 2].color) {
        excludedColors.push(board[row][col - 1].color);
      }
      if (row >= 2 && board[row - 1][col].color === board[row - 2][col].color) {
        excludedColors.push(board[row - 1][col].color);
      }
      board[row][col].color = getRandomColor(excludedColors);
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
export function checkMatches(board) {
  const size = board.length;
  const toRemove = new Set();

  // horizontal
  for (let row = 0; row < size; row++) {
    let count = 1;
    for (let col = 1; col < size; col++) {
      const curr = board[row][col].color;
      const prev = board[row][col - 1].color;
      if (curr && curr === prev) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            toRemove.add(
              JSON.stringify({
                row,
                col: col - 1 - k,
                color: board[row][col - 1 - k].color,
              })
            );
          }
        }
        count = 1;
      }
    }
    if (count >= 3) {
      for (let k = 0; k < count; k++) {
        toRemove.add(
          JSON.stringify({
            row,
            col: size - 1 - k,
            color: board[row][size - 1 - k].color,
          })
        );
      }
    }
  }

  // vertical
  for (let col = 0; col < size; col++) {
    let count = 1;
    for (let row = 1; row < size; row++) {
      const curr = board[row][col].color;
      const prev = board[row - 1][col].color;
      if (curr && curr === prev) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            toRemove.add(
              JSON.stringify({
                row: row - 1 - k,
                col,
                color: board[row - 1 - k][col].color,
              })
            );
          }
        }
        count = 1;
      }
    }
    if (count >= 3) {
      for (let k = 0; k < count; k++) {
        toRemove.add(
          JSON.stringify({
            row: size - 1 - k,
            col,
            color: board[size - 1 - k][col].color,
          })
        );
      }
    }
  }

  if (toRemove.size === 0) return { board, hasMatches: false, removed: [] };

  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  Array.from(toRemove).forEach((item) => {
    const { row, col } = JSON.parse(item);
    newBoard[row][col].color = null;
  });

  return {
    board: newBoard,
    hasMatches: true,
    removed: Array.from(toRemove).map((i) => JSON.parse(i)),
  };
}

// are there any matches, switch true|false
export function hasAnyMatches(board) {
  return checkMatches(board).hasMatches;
}

// gravity
export function applyGravity(board) {
  const size = board.length;
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

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

//questions?
export function findAvailableMoves(board) {
  const size = board.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const directions = [
        { rowOffset: 0, colOffset: 1 },
        { rowOffset: 1, colOffset: 0 },
      ];

      for (const { rowOffset, colOffset } of directions) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;

        if (newRow < size && newCol < size) {
          const swappedBoard = swapCells(
            board,
            { row, col },
            { row: newRow, col: newCol }
          );
          if (hasAnyMatches(swappedBoard)) {
            return {
              hasMoves: true,
              from: { row, col },
              to: { row: newRow, col: newCol },
            };
          }
        }
      }
    }
  }

  return { hasMoves: false, from: null, to: null };
}

// shuffle board with no matches to have available moves
export function shuffleBoard(board) {
  const size = board.length;
  const allColors = board.flat().map((cell) => cell.color);

  let newBoard = [];
  do {
    const shuffledColors = fisherShuffle(allColors);

    newBoard = [];
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const newRow = [];
      for (let colIndex = 0; colIndex < size; colIndex++) {
        newRow.push({ color: shuffledColors[rowIndex * size + colIndex] });
      }
      newBoard.push(newRow);
    }
  } while (!findAvailableMoves(newBoard).hasMoves);

  return newBoard;
}

function fisherShuffle(colors) {
  for (let i = colors.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
}

// fully resolve board with cascades
export function resolveBoard(board) {
  let currentBoard = board;
  let allRemoved = [];
  let cascades = 0;
  let first = true;

  while (true) {
    const matchResult = checkMatches(currentBoard);
    if (!matchResult.hasMatches) break;

    if (!first) cascades++;
    first = false;

    allRemoved.push(...matchResult.removed);
    currentBoard = applyGravity(matchResult.board);
  }

  return { board: currentBoard, removed: allRemoved, cascades };
}
