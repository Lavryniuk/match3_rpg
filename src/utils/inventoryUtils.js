export function getRandomRarity(rarities, rand = Math.random()) {
  const totalWeight = rarities.reduce((sum, rarity) => sum + rarity.weight, 0);

  let random = rand * totalWeight;

  for (const rarity of rarities) {
    if (random < rarity.weight) {
      return rarity.name;
    }

    random -= rarity.weight;
  }
}

export function getRandomFromArray(array, rand = Math.random()) {
  const index = Math.floor(rand * array.length);

  return array[index].name;
}

export function getRandomFragment({ rarities, slots, fragments }) {
  const rarity = getRandomRarity(rarities);
  const slot = getRandomFromArray(slots);

  const result = fragments.find((f) => f.rarity === rarity && f.slot === slot);

  return result;
}

export function getReward({
  levelCoinAmount,
  rarities,
  slots,
  fragments,
  addCoins,
  addUnknownFragment,
}) {
  addCoins(levelCoinAmount);

  const fragment = getRandomFragment({ rarities, slots, fragments });
  addUnknownFragment(fragment);
}

export function identifyFragment({
  fragment,
  addFragment,
  removeUnknownFragment,
  scrolls,
  useScroll,
}) {
  if (!fragment.type === "unknownFragment") return;
  if (scrolls === 0) return;

  useScroll();
  addFragment({
    rarity: fragment.rarity,
    slot: fragment.slot,
  });

  removeUnknownFragment(fragment);
}

export function craftItem({
  fragment,
  removeFragments,
  addEquipment,
  equipments,
  charClasses,
}) {
  if (fragment.count < 10 || !fragment.identified) return;

  const charClass = getRandomFromArray(charClasses);

  addEquipment({ fragment, equipments, charClass });

  removeFragments({ rarity: fragment.rarity, slot: fragment.slot });
}
