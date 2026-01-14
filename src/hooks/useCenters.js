import { useState } from "react";
import { getRandomCells } from "../utils/skillUtils";

export function useCenters(board) {
  const [skillTargets, setSkillTargets] = useState([]);

  function getCenters(board, centersAmount) {
    const size = board.length;
    const result = getRandomCells(size, centersAmount);

    setSkillTargets(result);
  }

  return {
    getCenters,
  };
}
