export const migrationToV2 = (oldState) => {
  const migrateItem = (item) => {
    if (!item) {
      return item;
    }

    const { charClass, ...rest } = item;

    return {
      ...rest,
      requiredClassId: charClass,
    };
  };

  return {
    ...oldState,
    version: 2,
    equipmentsInventory: oldState.equipmentsInventory?.map(migrateItem) ?? [],
    charactersInventory: Object.fromEntries(
      Object.entries(oldState.charactersInventory ?? {}).map(
        ([charId, equipments]) => [
          charId,
          Object.fromEntries(
            Object.entries(equipments ?? {}).map(([slot, item]) => [
              slot,
              migrateItem(item),
            ])
          ),
        ]
      )
    ),
  };
};
