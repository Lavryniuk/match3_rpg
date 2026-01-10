import BaseCharacter from "./BaseCharacter";

export default class Sorceress extends BaseCharacter {
  constructor() {
    super();

    this.name = "Lucian";
    this.class = "Paladin";

    this.skills = [
      {
        id: "swordStrike",
        name: "Sword Strike",
        charges: 100,
        effect: this.swordStrike,
      },
      {
        id: "shieldPulse",
        name: "Shield Pulse",
        charges: 100,
        effect: this.shieldPulse,
      },
      {
        id: "meditation",
        name: "Meditation",
        charges: 100,
        effect: this.meditation,
      },
    ];
  }

  swordStrike = (board, level, context) => {
    //pattern for paladin

    const pattern = [
      [0, 0],
      [0, -1],
      [0, 1],
      [0, -2],
      [0, 2],
    ];

    const centersAmount = 1;

    return this.applyDestructiveSkill(board, level, pattern, centersAmount);
  };

  shieldPulse = (board, level, context) => {
    const patterns = [
      [
        [0, 0],
        [0, -1],
        [0, 1],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
      ],
    ];

    const centersAmount = 3;

    return this.applyDestructiveSkill(board, level, patterns, centersAmount);
  };

  meditation = (board, level, context) => {
    return this.restoreSkill(board, level, context);
  };
}
