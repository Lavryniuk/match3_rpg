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
  const [skillTargets, setSkillTargets] = useState([]);

  const { board } = boardApi;
  const { applySkillEffect } = skillApi;
  const { handleCellClick } = selectedCellApi;

  const onSkillClick = (skill) => {
    if (level <= 30 || skill.targetsCount === 0) {
      const context = contextGeneratorsLow[skill.id](
        skill,
        board.length,
        skill.targetsCount
      );
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
      const newTarget = { row, col };

      const alreadySelected = skillTargets.some(
        (t) => t.row === row && t.col === col
      );
      if (alreadySelected) return;

      const nextTargets = [...skillTargets, newTarget];
      setSkillTargets(nextTargets);

      if (nextTargets.length < activeSkill.targetsCount) {
        return;
      }

      const context = contextGeneratorsHigh[activeSkill.id](
        activeSkill,
        board.length,
        skill.targetsCount,
        { centers: nextTargets }
      );
      console.log("FINAL CONTEXT", context);
      applySkillEffect(character, activeSkill.id, board, context);

      setActiveSkill(null);
      setSkillTargets([]);
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
