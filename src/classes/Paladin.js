import BaseCharacter from "./BaseCharacter";

export default class Paladin extends BaseCharacter {
  constructor() {
    super();
  }

  swordStrike = (board, context) => {
    return this.applyDestructiveSkill(board, context);
  };

  shieldPulse = (board, context) => {
    return this.applyDestructiveSkill(board, context);
  };

  meditation = (board, context) => {
    return this.restoreSkill(board, context);
  };
}
