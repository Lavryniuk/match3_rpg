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
  const [selectedPatterns, setSelectedPatterns] = useState([]);

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

      if (activeSkill.targetsCount > 1 && activeSkill.patterns?.length > 1) {
        setMode("pattern-selection");
        return;
      }

      if (nextTargets.length === activeSkill.targetsCount) {
        const context = contextGeneratorsHigh[activeSkill.id](
          activeSkill,
          board.length,
          activeSkill.targetsCount,
          { centers: nextTargets }
        );

        applySkillEffect(character, activeSkill.id, board, context);
        setActiveSkill(null);
        setSkillTargets([]);
        setMode("match");
      }
    }
  };

  const onPatternSelect = (pattern) => {
    const nextPatterns = [...selectedPatterns, pattern];
    setSelectedPatterns(nextPatterns);

    if (nextPatterns.length === activeSkill.targetsCount) {
      const context = contextGeneratorsHigh[activeSkill.id](
        activeSkill,
        board.length,
        activeSkill.targetsCount,
        { centers: skillTargets, patterns: nextPatterns }
      );

      applySkillEffect(character, activeSkill.id, board, context);

      setActiveSkill(null);
      setSkillTargets([]);
      setSelectedPatterns([]);
      setMode("match");
    } else {
      setMode("skill-targeting");
    }
  };

  return {
    mode,
    activeSkill,
    onSkillClick,
    onCellClick,
    onPatternSelect,
    isBoardBlocked: mode !== "match",
  };
}
