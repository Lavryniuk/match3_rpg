import { useGame } from "../../game/GameProvider";
import coinIcon from "../../assets/icons/coins.png";
import scrollIcon from "../../assets/icons/scroll.png";
import manaIcon from "../../assets/icons/manaPotion.png";

import "./header.scss";

export default function Header() {
  const { coins, scrolls, manaPotions } = useGame();

  return (
    <header className="header">
      <div className="header__resource">
        <img src={coinIcon} alt="Coins" />
        <span>{coins}</span>
      </div>
      <div className="header__resource">
        <img src={manaIcon} alt="Mana" />
        <span>{manaPotions}</span>
      </div>
      <div className="header__resource">
        <img src={scrollIcon} alt="Scrolls" />
        <span>{scrolls}</span>
      </div>
    </header>
  );
}
