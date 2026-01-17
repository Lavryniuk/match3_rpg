import { getRandomCells, getRandomCell } from "../utils/skillUtils";

import { generateRandomColors } from "../utils/skillUtils";

import { COLORS as colors } from "../utils/boardUtils";

const singleCenterDestructive = (skill, boardLength) => ({
  patterns: [skill.patterns],
  centers: [getRandomCell(boardLength)],
});

const multiPatternDestructive = (skill, boardLength, targetsCount) => {
  const centers = getRandomCells(boardLength, targetsCount);

  const patterns = centers.map(
    () => skill.patterns[Math.floor(Math.random() * skill.patterns.length)]
  );

  return {
    centers,
    patterns,
  };
};

const restoreMove = () => ({
  options: { consumesMove: false, grantsMove: 1 },
});

const entropyRandomColor = (skill, boardLength, targetsCount) => {
  const cells = getRandomCells(boardLength, targetsCount);
  return {
    cells,
    colors: generateRandomColors(cells.length, colors),
  };
};

const entropyNullColor = (skill, boardLength, targetsCount) => ({
  cells: getRandomCells(boardLength, targetsCount),
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
  swordStrike: (skill, boardLength, targetsCount, extraContext) => ({
    patterns: [skill.patterns],
    centers: extraContext?.centers || [],
  }),
  shieldPulse: (skill, boardLength, targetsCount, extraContext) => ({
    patterns: extraContext?.pattern || [], //todo
    centers: extraContext?.centers || [],
  }),

  meteor: (skill, boardLength, targetsCount, extraContext) => ({
    patterns: [skill.patterns],
    centers: extraContext?.centers || [],
  }),
  realityDistortion: (skill, boardLength, targetsCount, extraContext) => {
    const cells = extraContext?.centers || [];

    return {
      cells,
      colors: generateRandomColors(cells.length, colors),
    };
  },

  arrowShot: (skill, boardLength, targetsCount, extraContext) => ({
    patterns: [skill.patterns],
    centers: extraContext?.centers || [],
  }),
  arrowBarrage: (skill, boardLength, targetsCount, extraContext) => ({
    cells: extraContext?.centers || [],
    colors: [null],
  }),
};
