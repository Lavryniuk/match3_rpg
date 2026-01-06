export class Paladin {
  constructor() {
    this.name = "Lucian";
    this.class = "Paladin";
    this.skills = [
      { name: "Sword Strike", charge: 1 },
      { name: "Shield Pulse", charge: 1 },
      { name: "Meditation", charge: 1 },
    ];
  }

  swordStrike(board) {
    // уничтожает 5 клеток горизонтально
    console.log("Sword Strike activated");
    // TODO: логика матч-3
  }

  shieldPulse(board, level) {
    // активирует 3 заряженные клетки
    console.log("Shield Pulse activated");
    // TODO: логика взрыва по соседям
  }

  meditation(advert = false) {
    // +1 ход обычное использование, +2 если реклама
    return advert ? 2 : 1;
  }
}

export class Sorceress {
  constructor() {
    this.name = "Cortana";
    this.class = "Sorceress";
    this.skills = [
      { name: "Meteorite", charge: 1 },
      { name: "Reality Warp", charge: 1 },
      { name: "Energy Restore", charge: 1 },
    ];
  }

  meteorite(board) {
    console.log("Meteorite activated");
    // TODO: крест из 5 клеток
  }

  realityWarp(board, level) {
    console.log("Reality Warp activated");
    // TODO: меняем цвет 5 клеток
  }

  energyRestore(advert = false) {
    return advert ? 2 : 1;
  }
}

export class Archer {
  constructor() {
    this.name = "Elandor";
    this.class = "Archer";
    this.skills = [
      { name: "Arrow Shot", charge: 1 },
      { name: "Arrow Barrage", charge: 1 },
      { name: "Shadow", charge: 1 },
    ];
  }

  arrowShot(board) {
    console.log("Arrow Shot activated");
    // TODO: 5 клеток вертикально
  }

  arrowBarrage(board, level) {
    console.log("Arrow Barrage activated");
    // TODO: убивает 5 клеток, выбор зависит от уровня
  }

  shadow(advert = false) {
    return advert ? 2 : 1;
  }
}
