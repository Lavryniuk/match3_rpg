import { canUseSkill, getSkill } from "../utils/skillUtils";

import {
  contextGeneratorsLow,
  contextGeneratorsHigh,
} from "../classes/skillContextGenerator";

export function useSkill(onUpdateGameState) {
  function getContextGenerator(skillId, level) {
    if (level <= 30) {
      return contextGeneratorsLow[skillId];
    }
    return contextGeneratorsHigh[skillId];
  }

  const applySkillEffect = (character, skillId, board, level) => {
    const skill = getSkill(character, skillId);
    if (!skill || !canUseSkill(character, skillId)) return board;

    const characterInstance = new character.classRef();

    const contextGenerator = getContextGenerator(skillId, level);

    const context = contextGenerator
      ? contextGenerator(skill, board.length)
      : { options: {} };

    const newBoard = characterInstance[skillId](board, context);

    skill.charges -= 1;

    if (onUpdateGameState) {
      onUpdateGameState(null, newBoard, context.options);
    }

    return newBoard;
  };

  return {
    applySkillEffect,
  };
}
