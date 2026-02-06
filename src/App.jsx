import { BrowserRouter, Routes, Route } from "react-router-dom";

import GameProvider from "./game/GameProvider";
import MainLayout from "./pages/MainLayout";
import HomePage from "./pages/HomePage";
import LevelMapPage from "./pages/LevelMapPage";
import CampPage from "./pages/CampPage";
import InventoryPage from "./pages/InventoryPage";

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<LevelMapPage />} />
            <Route path="/camp" element={<CampPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
