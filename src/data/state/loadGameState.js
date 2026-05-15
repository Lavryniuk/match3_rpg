import { sanitizeState } from "./sanitizeState";
import { migrationToV2 } from "./migrations/migrationToV2";

export const loadGameState = () => {
  const localState = localStorage.getItem("gameState");
  const parsedState = localState ? JSON.parse(localState) : null;

  const sanitizedState = sanitizeState(parsedState);

  if (!sanitizedState) return null;

  if (sanitizedState.version === 1) {
    const migratedState = migrationToV2(sanitizedState);
    return migratedState;
  }

  return sanitizedState;
};
