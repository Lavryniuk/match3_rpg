export const sanitizeState = (state) => {
  if (!state || typeof state !== "object") return null;

  return {
    ...state,
    charactersInventory:
      state.charactersInventory &&
      typeof state.charactersInventory === "object" &&
      !Array.isArray(state.charactersInventory)
        ? state.charactersInventory
        : {},
    equipmentsInventory: Array.isArray(state.equipmentsInventory)
      ? state.equipmentsInventory
      : [],
  };
};
