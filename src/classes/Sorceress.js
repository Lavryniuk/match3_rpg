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
        charges: 100,
        effect: this.meteor,
      },
      {
        id: "realityDistortion",
        name: "Reality Distortion",
        charges: 100,
        effect: this.realityDistortion,
      },
      {
        id: "manaRestore",
        name: "Mana Restore",
        charges: 100,
        effect: this.manaRestore,
      },
    ];
  }

  meteor = (board, level, context) => {
    //pattern for sorceress
    const pattern = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    const centersAmount = 1;

    return this.applyDestructiveSkill(board, level, pattern, centersAmount);
  };

  realityDistortion = (board, level, context) => {
    const skillResult = this.getRandomColor();
    return this.applyEntropySkill(board, level, skillResult);
  };

  manaRestore = (board, level, context) => {
    return this.restoreSkill(board, level, context);
  };
}
