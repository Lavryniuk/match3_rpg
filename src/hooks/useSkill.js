import { canUseSkill, getSkill } from "../utils/skillUtils";

import {
  contextGeneratorsLow,
  contextGeneratorsHigh,
} from "../classes/skillContextGenerator";

export function useSkill(updateGameState) {
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
    console.log(contextGenerator);

    const context = contextGenerator
      ? contextGenerator(skill, board.length)
      : { options: {} };
    console.log(context);

    const newBoard = characterInstance[skillId](board, context);

    skill.charges -= 1;

    updateGameState(null, newBoard, context.options);

    return newBoard;
  };

  return {
    applySkillEffect,
  };
}
