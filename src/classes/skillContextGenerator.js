import { getRandomCells, getRandomCell } from "../utils/skillUtils";

import { getRandomColor } from "../utils/skillUtils";

import { COLORS as colors } from "../utils/boardUtils";

const singleCenterDestructive = (skill, boardLength) => ({
  pattern: skill.pattern,
  centers: [getRandomCell(boardLength)],
});

const multiPatternDestructive = (skill, boardLength) => ({
  pattern: skill.pattern[Math.floor(Math.random() * skill.pattern.length)],
  centers: getRandomCells(boardLength, 2),
});

const restoreMove = () => ({
  options: { consumesMove: false, grantsMove: 1 },
});

const entropyRandomColor = (skill, boardLength) => ({
  cells: getRandomCells(boardLength, 5),
  color: getRandomColor(colors),
});

const entropyNullColor = (skill, boardLength) => ({
  cells: getRandomCells(boardLength, 5),
  color: null,
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
    pattern: skill.pattern,
    centers: extraContext?.centers || [],
  }),
  shieldPulse: (skill, boardLength, extraContext) => ({
    pattern: extraContext?.pattern || [],
    centers: extraContext?.centers || [],
  }),
  meditation: restoreMove,

  meteor: (skill, boardLength, extraContext) => ({
    pattern: skill.pattern,
    centers: extraContext?.centers || [],
  }),
  realityDistortion: (skill, boardLength, extraContext) => ({
    cells: extraContext?.centers || [],
    color: getRandomColor(),
  }),
  manaRestore: restoreMove,

  arrowShot: (skill, boardLength, extraContext) => ({
    pattern: skill.pattern,
    centers: extraContext?.centers || [],
  }),
  arrowBarrage: (skill, boardLength, extraContext) => ({
    cells: extraContext?.centers || [],
    color: null,
  }),
  shadow: restoreMove,
};
