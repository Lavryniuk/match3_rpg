import { canUseSkill, getSkill } from "../utils/skillUtils";

export function useSkill(applyUpdateGameState) {
  // todo Skill applies .color on blocked cells -> blocked cells move down due to gravity
  const applySkillEffect = (character, skillId, board, context) => {
    const skill = getSkill(character, skillId);
    if (!skill || !canUseSkill(character, skillId)) return board;

    const characterInstance = new character.classRef();

    const newBoard = characterInstance[skillId](board, context);

    skill.charges -= 1;

    applyUpdateGameState(null, newBoard, context.options);

    return newBoard;
  };

  return {
    applySkillEffect,
  };
}
