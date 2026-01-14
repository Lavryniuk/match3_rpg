import Paladin from "./Paladin";
import Sorceress from "./Sorceress";
import Archer from "./Archer";

export const characters = [
  {
    id: "paladin",
    name: "Lucian",
    class: "Paladin",
    avatar: "../assets/avatars/paladin.png",
    classRef: Paladin,
    skills: [
      {
        id: "swordStrike",
        name: "Sword Strike",
        charges: 100,
        pattern: [
          [0, 0],
          [0, -1],
          [0, 1],
          [0, -2],
          [0, 2],
        ],
      },
      {
        id: "shieldPulse",
        name: "Shield Pulse",
        charges: 100,
        pattern: [
          [
            [0, 0],
            [0, -1],
            [0, 1],
          ],
          [
            [0, 0],
            [-1, 0],
            [1, 0],
          ],
        ],
      },
      {
        id: "meditation",
        name: "Meditation",
        charges: 100,
        pattern: null,
      },
    ],
  },
  {
    id: "sorceress",
    name: "Cortana",
    class: "Sorceress",
    avatar: "../assets/avatars/sorceress.png",
    classRef: Sorceress,
    skills: [
      {
        id: "meteor",
        name: "Meteor",
        charges: 100,
        pattern: [
          [0, 0],
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ],
      },
      {
        id: "realityDistortion",
        name: "Reality Distortion",
        charges: 100,
        pattern: null,
      },
      {
        id: "manaRestore",
        name: "Mana Restore",
        charges: 100,
        pattern: null,
      },
    ],
  },
  {
    id: "archer",
    name: "Elandor",
    class: "Archer",
    avatar: "../assets/avatars/archer.png",
    classRef: Archer,
    skills: [
      {
        id: "arrowShot",
        name: "Arrow Shot",
        charges: 100,
        pattern: [
          [0, 0],
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ],
      },
      {
        id: "arrowBarrage",
        name: "Arrow Barrage",
        charges: 100,
        pattern: null,
      },
      {
        id: "shadow",
        name: "Shadow",
        charges: 100,
        pattern: null,
      },
    ],
  },
];
