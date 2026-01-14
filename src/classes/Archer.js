import BaseCharacter from "./BaseCharacter";

export default class Archer extends BaseCharacter {
  constructor() {
    super();
  }

  arrowShot = (board, context) => {
    return this.applyDestructiveSkill(board, context);
  };

  arrowBarrage = (board, context) => {
    return this.applyEntropySkill(board, context);
  };

  shadow = (board, context) => {
    return this.restoreSkill(board, context);
  };
}
