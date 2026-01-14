import BaseCharacter from "./BaseCharacter";

export default class Sorceress extends BaseCharacter {
  constructor() {
    super();
  }

  meteor = (board, context) => {
    return this.applyDestructiveSkill(board, context);
  };

  realityDistortion = (board, context) => {
    return this.applyEntropySkill(board, context);
  };

  manaRestore = (board, context) => {
    return this.restoreSkill(board, context);
  };
}
