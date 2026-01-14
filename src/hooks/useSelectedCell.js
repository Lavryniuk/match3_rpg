import { useState } from "react";

export function useSelectedCell(onPairReady) {
  const [selectedCell, setSelectedCell] = useState(null);
  console.log(selectedCell);

  function handleCellClick(row, col) {
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

    onPairReady(selectedCell, row, col);

    setSelectedCell(null);
  }

  return { selectedCell, handleCellClick };
}
