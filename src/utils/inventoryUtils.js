export function getRandomRarity(rarities, rand = Math.random()) {
  const totalWeight = rarities.reduce((sum, rarity) => sum + rarity.weight, 0);

  let random = rand * totalWeight;

  for (const rarity of rarities) {
    if (random < rarity.weight) {
      return rarity.id;
    }

    random -= rarity.weight;
  }
}

export function getRandomSlot(slots, rand = Math.random()) {
  const index = Math.floor(rand * slots.length);

  return slots[index].id;
}

export function getRandomFragment({ rarities, slots, fragments }) {
  const rarity = getRandomRarity(rarities);
  const slot = getRandomSlot(slots);

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

export function identifyFragment({ fragment, addFragment, useScroll }) {
  if (fragment.identified) return;

  useScroll(1);
  addFragment({ ...fragment, identified: true });
}

export function craftItem({
  fragment,
  removeFragments,
  addEquipment,
  items,
  charClasses,
}) {
  if (fragment.count < 10 || !fragment.identified) return;

  const charClass = getRandomClass(charClasses);

  addEquipment({ fragment, items, charClass });

  removeFragments(fragment);
}

export function getRandomClass(charClasses, rand = Math.random()) {
  const index = Math.floor(rand * charClasses.length);

  return charClasses[index];
}
