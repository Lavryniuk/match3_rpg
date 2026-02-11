import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export default function GameProvider({ children }) {
  const [coins, setCoins] = useState(100);
  const [scrolls, setScrolls] = useState(5);
  const [manaPotions, setManaPotions] = useState(5);
  const [fragmentsInventory, setFragmentsInventory] = useState([]);
  const [equipmentsInventory, setEquipmentsInventory] = useState([]);
  console.log(fragmentsInventory);

  const addUnknownFragment = (fragment) =>
    setFragmentsInventory((prev) => [...prev, { ...fragment }]);

  const addFragment = (fragment) =>
    setFragmentsInventory((prev) => {
      const existing = prev.find((f) => f.id === fragment.id);
      if (existing) {
        return prev.map((f) =>
          f.id === fragment.id ? { ...f, count: f.count + 1 } : f
        );
      }

      return [...prev, { ...fragment, count: 1 }];
    });

  const removeFragments = (fragment) =>
    setFragmentsInventory((prev) => {
      if (fragment.count < 10 || !fragment.identified) return;

      const newInv = prev.map((f) =>
        f.id === fragment.id ? { ...f, count: f.count - 10 } : f
      );

      return newInv.filter((f) => f.id !== fragment.id || f.count !== 0);
    });

  const addEquipment = ({ fragment, items, charClass }) =>
    setEquipmentsInventory((prev) => {
      const item = items.find(
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
  const useScroll = () => setScrolls((s) => Math.max(s - 1, 0));

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
        fragmentsInventory,
        addFragment,
        addUnknownFragment,
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
