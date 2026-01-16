import { canUseSkill, getSkill } from "../utils/skillUtils";

export function useSkill(updateGameState) {
  const applySkillEffect = (character, skillId, board, context) => {
    const skill = getSkill(character, skillId);
    if (!skill || !canUseSkill(character, skillId)) return board;

    const characterInstance = new character.classRef();

    const newBoard = characterInstance[skillId](board, context);

    skill.charges -= 1;

    updateGameState(null, newBoard, context.options);

    return newBoard;
  };

  return {
    applySkillEffect,
  };
}
