import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const GameContext = createContext();

export default function GameProvider({ children }) {
  const [coins, setCoins] = useState(100);
  const [scrolls, setScrolls] = useState(500);
  const [manaPotions, setManaPotions] = useState(5);
  const [unknownFragments, setUnknownFragments] = useState([]);
  const [fragmentStacks, setFragmentStacks] = useState([]);
  const [equipmentsInventory, setEquipmentsInventory] = useState([]);

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
