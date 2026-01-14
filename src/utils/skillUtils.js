export function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function getSkill(character, skillId) {
  return character.skills.find((skill) => skill.id === skillId);
}

export function canUseSkill(character, skillId) {
  const skill = getSkill(character, skillId);
  return skill && skill.charges > 0;
}

export function getRandomCells(size, amount) {
  const result = [];

  while (result.length < amount) {
    const cell = getRandomCell(size);

    const alreadyExists = result.some(
      (c) => c.row === cell.row && c.col === cell.col
    );

    if (!alreadyExists) {
      result.push(cell);
    }
  }

  return result;
}

export function getRandomCell(size) {
  return {
    row: Math.floor(Math.random() * size),
    col: Math.floor(Math.random() * size),
  };
}
