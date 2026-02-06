import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export default function GameProvider({ children }) {
  const [coins, setCoins] = useState(100);
  const [scrolls, setScrolls] = useState(5);
  const [manaPotions, setManaPotions] = useState(5);

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
