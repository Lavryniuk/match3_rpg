import { getRandomCells, getRandomCell } from "../utils/skillUtils";

import { generateRandomColors } from "../utils/skillUtils";

import { COLORS as colors } from "../utils/boardUtils";

const singleCenterDestructive = (skill, boardLength) => ({
  patterns: [skill.pattern],
  centers: [getRandomCell(boardLength)],
});

const multiPatternDestructive = (skill, boardLength) => {
  const centers = getRandomCells(boardLength, 2);

  const patterns = centers.map(
    () => skill.pattern[Math.floor(Math.random() * skill.pattern.length)]
  );

  return {
    centers,
    patterns,
  };
};

const restoreMove = () => ({
  options: { consumesMove: false, grantsMove: 1 },
});

const entropyRandomColor = (skill, boardLength) => {
  const cells = getRandomCells(boardLength, 5);
  return {
    cells,
    colors: generateRandomColors(cells.length, colors),
  };
};

const entropyNullColor = (skill, boardLength) => ({
  cells: getRandomCells(boardLength, 5),
  colors: [null],
});

export const contextGeneratorsLow = {
  // Paladin
  swordStrike: singleCenterDestructive,
  shieldPulse: multiPatternDestructive,
  meditation: restoreMove,

  // Sorceress
  meteor: singleCenterDestructive,
  realityDistortion: entropyRandomColor,
  manaRestore: restoreMove,

  // Archer
  arrowShot: singleCenterDestructive,
  arrowBarrage: entropyNullColor,
  shadow: restoreMove,
};

export const contextGeneratorsHigh = {
  swordStrike: (skill, boardLength, extraContext) => ({
    patterns: [skill.pattern],
    centers: extraContext?.centers || [],
  }),
  shieldPulse: (skill, boardLength, extraContext) => ({
    patterns: extraContext?.pattern || [],
    centers: extraContext?.centers || [],
  }),
  meditation: restoreMove,

  meteor: (skill, boardLength, extraContext) => ({
    patterns: [skill.pattern],
    centers: extraContext?.centers || [],
  }),
  realityDistortion: (skill, boardLength, extraContext) => {
    const cells = extraContext?.cells || [];

    return {
      cells,
      colors: generateRandomColors(cells.length, colors),
    };
  },
  manaRestore: restoreMove,

  arrowShot: (skill, boardLength, extraContext) => ({
    patterns: [skill.pattern],
    centers: extraContext?.centers || [],
  }),
  arrowBarrage: (skill, boardLength, extraContext) => ({
    cells: extraContext?.centers || [],
    colors: [null],
  }),
  shadow: restoreMove,
};
