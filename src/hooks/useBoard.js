import { useState } from "react";
import * as BoardUtils from "../utils/boardUtils";

export function useBoard(
  size = 8,
  targetColor = "red",
  targetAmount = 10,
  moves = 100
) {
  const [board, setBoard] = useState(() => {
    let newBoard = BoardUtils.createBoard(size);

    while (!BoardUtils.hasAvailableMoves(newBoard)) {
      newBoard = BoardUtils.shuffleBoard(newBoard);
      newBoard = BoardUtils.resolveBoard(newBoard).board;
    }

    return newBoard;
  });

  const [selectedCell, setSelectedCell] = useState(null);
  const [movesLeft, setMovesLeft] = useState(moves);
  const [collected, setCollected] = useState(0);
  const [levelStatus, setLevelStatus] = useState(null);

  function handleCellClick(row, col) {
    if (levelStatus) return;
    if (movesLeft <= 0) return;

    if (!selectedCell) {
      setSelectedCell({ row, col });
      return;
    }

    if (selectedCell.row === row && selectedCell.col === col) {
      setSelectedCell(null);
      return;
    }

    const isNeighbour =
      Math.abs(selectedCell.row - row) + Math.abs(selectedCell.col - col) === 1;

    if (!isNeighbour) {
      setSelectedCell({ row, col });
      return;
    }

    const swappedBoard = BoardUtils.swapCells(board, selectedCell, {
      row,
      col,
    });

    if (!BoardUtils.hasAnyMatches(swappedBoard)) {
      updateGameState(0, board);
      setSelectedCell(null);
      return;
    }

    updateGameState(null, swappedBoard);
    setSelectedCell(null);
  }

  function updateGameState(collectedOverride = null, rawBoard, options = {}) {
    const { consumesMove = true, grantsMove = 0 } = options;

    const { board: resolvedBoard, removed } = BoardUtils.resolveBoard(rawBoard);

    const collectedThisMove =
      collectedOverride !== null
        ? collectedOverride
        : removed.filter((cell) => cell.color === targetColor).length;

    const nextCollected = collected + collectedThisMove;

    let nextMoves = consumesMove ? movesLeft - 1 : movesLeft;
    nextMoves += grantsMove;

    let nextLevelStatus = null;
    if (nextCollected >= targetAmount) nextLevelStatus = "won";
    else if (nextMoves <= 0) nextLevelStatus = "lost";

    let finalBoard = BoardUtils.applyGravity(resolvedBoard);

    if (!BoardUtils.hasAvailableMoves(finalBoard)) {
      const shuffled = BoardUtils.shuffleBoard(finalBoard);
      finalBoard = BoardUtils.resolveBoard(shuffled).board;
    }

    setCollected(nextCollected);
    setMovesLeft(nextMoves);
    setBoard(finalBoard);
    if (nextLevelStatus) setLevelStatus(nextLevelStatus);
  }

  const applySkillEffect = (
    character,
    skillId,
    board,
    level,
    extraContext = {}
  ) => {
    const skill = character.getSkill(skillId);
    if (!skill || skill.charges <= 0) return board;

    const newBoard = skill.effect(board, level, extraContext);
    skill.charges -= 1;
    console.log("the same?", board === newBoard);
    updateGameState(null, newBoard, extraContext.options);

    return newBoard;
  };

  return {
    board,
    handleCellClick,
    selectedCell,
    movesLeft,
    collected,
    levelStatus,
    applySkillEffect,
  };
}
