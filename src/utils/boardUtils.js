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
export function createBoardFromMask(mask) {
  const board = [];

  for (let row = 0; row < mask.length; row++) {
    const rowArr = [];

    for (let col = 0; col < mask[row].length; col++) {
      if (mask[row][col] === "1") {
        const excludedColors = [];

        if (
          col >= 2 &&
          rowArr[col - 1] &&
          rowArr[col - 2] &&
          rowArr[col - 1].color === rowArr[col - 2].color
        ) {
          excludedColors.push(rowArr[col - 1].color);
        }

        if (
          row >= 2 &&
          board[row - 1][col] &&
          board[row - 2][col] &&
          board[row - 1][col].color === board[row - 2][col].color
        ) {
          excludedColors.push(board[row - 1][col].color);
        }

        rowArr.push({
          row,
          col,
          color: getRandomColor(excludedColors),
        });
      } else {
        rowArr.push({ blocked: true });
      }
    }

    board.push(rowArr);
  }

  return board;
}

// swap two cells
export function swapCells(board, cellA, cellB) {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  const temp = newBoard[cellA.row][cellA.col];

  if (
    newBoard[cellA.row][cellA.col].blocked ||
    newBoard[cellB.row][cellB.col].blocked
  )
    return board;

  newBoard[cellA.row][cellA.col] = newBoard[cellB.row][cellB.col];
  newBoard[cellB.row][cellB.col] = temp;

  return newBoard;
}

// check matches and remove them
export function checkMatches(board) {
  const numRows = board.length;
  const numCols = board[0].length;
  const toRemove = new Set();

  function commitSequence(count, row, col, direction) {
    if (count < 3) return;

    if (direction === "horizontal") {
      for (let k = 0; k < count; k++) {
        toRemove.add(
          JSON.stringify({
            row,
            col: col - k,
            color: board[row][col - k].color,
          })
        );
      }
    } else {
      for (let k = 0; k < count; k++) {
        toRemove.add(
          JSON.stringify({
            row: row - k,
            col,
            color: board[row - k][col].color,
          })
        );
      }
    }
  }

  // horizontal
  for (let row = 0; row < numRows; row++) {
    let count = 1;
    for (let col = 1; col < numCols; col++) {
      const curr = board[row][col];
      const prev = board[row][col - 1];

      if (prev.blocked || curr.blocked) {
        commitSequence(count, row, col - 1, "horizontal");
        count = 1;
        continue;
      }

      if (curr.color && curr.color === prev.color) {
        count++;
      } else {
        commitSequence(count, row, col - 1, "horizontal");
        count = 1;
      }
    }
    commitSequence(count, row, numCols - 1, "horizontal");
  }

  // vertical
  for (let col = 0; col < numCols; col++) {
    let count = 1;
    for (let row = 1; row < numRows; row++) {
      const curr = board[row][col];
      const prev = board[row - 1][col];

      if (prev.blocked || curr.blocked) {
        commitSequence(count, row - 1, col, "vertical");
        count = 1;
        continue;
      }

      if (curr.color && curr.color === prev.color) {
        count++;
      } else {
        commitSequence(count, row - 1, col, "vertical");
        count = 1;
      }
    }
    commitSequence(count, numRows - 1, col, "vertical");
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
  const numRows = board.length;
  const numCols = board[0].length;

  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  for (let col = 0; col < numCols; col++) {
    for (let row = numRows - 1; row >= 0; row--) {
      if (newBoard[row][col].blocked) {
        continue;
      }

      if (!newBoard[row][col].color) {
        let r = row - 1;
        while (r >= 0 && !newBoard[r][col].color) r--;

        if (r >= 0) {
          newBoard[row][col] = newBoard[r][col];
          newBoard[r][col] = { color: null };
        } else {
          newBoard[row][col] = {
            row,
            col,
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
  const numRows = board.length;
  const numCols = board[0].length;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const directions = [
        { rowOffset: 0, colOffset: 1 },
        { rowOffset: 1, colOffset: 0 },
      ];

      for (const { rowOffset, colOffset } of directions) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;

        if (newRow < numRows && newCol < numCols) {
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
  const numRows = board.length;
  const numCols = board[0].length;

  const allColors = board
    .flat()
    .filter((cell) => !cell.blocked)
    .map((cell) => cell.color);
  console.log(numRows * numCols, allColors.length);

  let newBoard = [];
  do {
    const shuffledColors = fisherShuffle(allColors);

    let colorCount = 0;

    newBoard = [];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      const newRow = [];
      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        const cell = board[rowIndex][colIndex];

        if (cell.blocked) {
          newRow.push({ ...cell });
        } else {
          newRow.push({
            row: rowIndex,
            col: colIndex,
            color: shuffledColors[colorCount],
          });
          colorCount++;
        }
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
