import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { characters } from "../classes/charactersConfig";

const GameContext = createContext();

export default function GameProvider({ children }) {
  const [localState] = useState(() => {
    const saved = localStorage.getItem("gameState");
    return saved ? JSON.parse(saved) : null;
  });

  const [coins, setCoins] = useState(localState?.coins ?? 100);
  const [scrolls, setScrolls] = useState(localState?.scrolls ?? 500);
  const [manaPotions, setManaPotions] = useState(localState?.manaPotions ?? 5);
  const [unknownFragments, setUnknownFragments] = useState(
    localState?.unknownFragments ?? []
  );
  const [fragmentStacks, setFragmentStacks] = useState(
    localState?.fragmentStacks ?? []
  );
  const [equipmentsInventory, setEquipmentsInventory] = useState(
    localState?.equipmentsInventory ?? []
  );

  const [charactersInventory, setCharactersInventory] = useState(
    localState?.charactersInventory ?? {
      sorceress: {
        helmet: null,
        body: null,
        weapon: null,
        offHand: null,
        boots: null,
      },
      archer: {
        helmet: null,
        body: null,
        weapon: null,
        offHand: null,
        boots: null,
      },
      paladin: {
        helmet: null,
        body: null,
        weapon: null,
        offHand: null,
        boots: null,
      },
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "gameState",
      JSON.stringify({
        coins,
        scrolls,
        manaPotions,
        unknownFragments,
        fragmentStacks,
        equipmentsInventory,
        charactersInventory,
      })
    );
  }, [
    coins,
    scrolls,
    manaPotions,
    unknownFragments,
    fragmentStacks,
    equipmentsInventory,
    charactersInventory,
  ]);

  const addUnknownFragment = (fragment) =>
    setUnknownFragments((prev) => [...prev, { ...fragment, id: uuidv4() }]);

  const removeUnknownFragment = (fragment) =>
    setUnknownFragments((prev) => prev.filter((f) => f.id !== fragment.id));

  const addFragment = ({ rarity, slot }) =>
    setFragmentStacks((prev) => {
      const existing = prev.find((f) => f.rarity === rarity && f.slot === slot);
      if (existing) {
        return prev.map((f) =>
          f.rarity === rarity && f.slot === slot
            ? { ...f, count: f.count + 1 }
            : f
        );
      }

      return [...prev, { type: "fragmentStacks", rarity, slot, count: 1 }];
    });

  const removeFragments = ({ rarity, slot }) =>
    setFragmentStacks((prev) => {
      const newInv = prev.map((f) =>
        f.rarity === rarity && f.slot === slot
          ? { ...f, count: f.count - 10 }
          : f
      );

      return newInv.filter((f) => f.count !== 0);
    });

  const addEquipment = ({ fragment, equipments, charClass }) =>
    setEquipmentsInventory((prev) => {
      const item = equipments.find(
        (f) =>
          f.rarity === fragment.rarity &&
          f.slot === fragment.slot &&
          f.charClass === charClass
      );
      return [...prev, { ...item }];
    });

  const addCoins = (amount) => setCoins((c) => c + amount);
  const spendCoins = (amount) => setCoins((c) => Math.max(c - amount, 0));

  const addScrolls = (amount) => setScrolls((s) => s + amount);
  const useScroll = () =>
    setScrolls((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });

  const addManaPotion = (amount) => setManaPotions((m) => m + amount);
  const useManaPotion = () => setManaPotions((m) => Math.max(m - 1, 0));

  const equipItem = ({ item, charId }) => {
    const character = characters.find((c) => c.id === charId);

    if (item.charClass !== character.id) {
      return;
    }

    const slot = item.slot;

    const currentItem = charactersInventory[charId][slot];

    setCharactersInventory((prev) => {
      return { ...prev, [charId]: { ...prev[charId], [slot]: item } };
    });

    setEquipmentsInventory((prev) => {
      let updated = prev.filter((i) => i.id !== item.id);

      if (currentItem) {
        updated = [...updated, currentItem];
      }

      return updated;
    });
  };

  const unequipItem = ({ slot, charId }) => {
    const currentItem = charactersInventory[charId][slot];

    if (!currentItem) return;

    setCharactersInventory((prev) => {
      return { ...prev, [charId]: { ...prev[charId], [slot]: null } };
    });

    setEquipmentsInventory((prev) => {
      return [...prev, currentItem];
    });
  };

  return (
    <GameContext.Provider
      value={{
        coins,
        scrolls,
        manaPotions,
        addCoins,
        spendCoins,
        addScrolls,
        useScroll,
        addManaPotion,
        useManaPotion,
        fragmentStacks,
        unknownFragments,
        addFragment,
        addUnknownFragment,
        removeUnknownFragment,
        removeFragments,
        equipmentsInventory,
        addEquipment,
        charactersInventory,
        equipItem,
        unequipItem,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
