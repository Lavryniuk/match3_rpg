import { useEffect, useRef } from "react";

import { findAvailableMoves } from "../utils/boardUtils";

export function useHint({
  board,
  gamePhase,
  hasUserInteracted,
  levelStatus,
  setHintCells,
}) {
  const hintShowTimer = useRef(null);

  useEffect(() => {
    if (gamePhase !== "hinted") return;
    if (!hasUserInteracted || levelStatus) return;

    hintShowTimer.current = setTimeout(() => {
      const move = findAvailableMoves(board);
      if (!move.hasMoves) return;

      setHintCells({ from: move.from, to: move.to });
    }, 8000);

    return () => {
      clearTimeout(hintShowTimer.current);
    };
  }, [gamePhase, board, hasUserInteracted, levelStatus, setHintCells]);
}
