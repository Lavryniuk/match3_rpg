import { useState } from "react";

import {
  contextGeneratorsLow,
  contextGeneratorsHigh,
} from "../classes/skillContextGenerator";

export function useGameMode(
  level,
  character,
  boardApi,
  skillApi,
  selectedCellApi
) {
  const [mode, setMode] = useState("match");
  const [activeSkill, setActiveSkill] = useState(null);

  const { board } = boardApi;
  const { applySkillEffect } = skillApi;
  const { handleCellClick } = selectedCellApi;

  const onSkillClick = (skill) => {
    if (level <= 30) {
      const context = contextGeneratorsLow[skill.id](skill, board.length);
      applySkillEffect(character, skill.id, board, context);
      return;
    }

    setActiveSkill(skill);
    setMode("skill-targeting");
  };

  const onCellClick = (row, col) => {
    if (mode === "match") {
      handleCellClick(row, col);
      return;
    }

    if (mode === "skill-targeting") {
      const context = contextGeneratorsHigh[activeSkill.id](
        activeSkill,
        board.length,
        [cells] //todo
      );
      applySkillEffect(character, activeSkill.id, board, context);

      setActiveSkill(null);
      setMode("match");
    }
  };

  return {
    mode,
    onSkillClick,
    onCellClick,
    isBoardBlocked: mode !== "match",
  };
}
