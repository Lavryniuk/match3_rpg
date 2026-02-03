import Paladin from "./Paladin";
import Sorceress from "./Sorceress";
import Archer from "./Archer";

import sorceressAvatar from "../assets/avatars/sorceress.png";
import paladinAvatar from "../assets/avatars/paladin.png";
import archerAvatar from "../assets/avatars/archer.png";

export const characters = [
  {
    id: "paladin",
    name: "Lucian",
    class: "Paladin",
    avatar: paladinAvatar,
    classRef: Paladin,
    skills: [
      {
        id: "swordStrike",
        name: "Sword Strike",
        charges: 100,
        targetsCount: 1,
        patterns: [
          [
            [0, 0],
            [0, -1],
            [0, 1],
            [0, -2],
            [0, 2],
          ],
        ],
      },
      {
        id: "shieldPulse",
        name: "Shield Pulse",
        charges: 100,
        targetsCount: 2,
        patterns: [
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
        targetsCount: 0,
        patterns: null,
      },
    ],
  },
  {
    id: "sorceress",
    name: "Cortana",
    class: "Sorceress",
    avatar: sorceressAvatar,
    classRef: Sorceress,
    skills: [
      {
        id: "meteor",
        name: "Meteor",
        charges: 100,
        targetsCount: 1,
        patterns: [
          [
            [0, 0],
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
          ],
        ],
      },
      {
        id: "realityDistortion",
        name: "Reality Distortion",
        charges: 100,
        targetsCount: 5,
        patterns: null,
      },
      {
        id: "manaRestore",
        name: "Mana Restore",
        charges: 100,
        targetsCount: 0,
        patterns: null,
      },
    ],
  },
  {
    id: "archer",
    name: "Elandor",
    class: "Archer",
    avatar: archerAvatar,
    classRef: Archer,
    skills: [
      {
        id: "arrowShot",
        name: "Arrow Shot",
        charges: 100,
        targetsCount: 1,
        patterns: [
          [
            [0, 0],
            [-1, 0],
            [1, 0],
            [-2, 0],
            [2, 0],
          ],
        ],
      },
      {
        id: "arrowBarrage",
        name: "Arrow Barrage",
        charges: 100,
        targetsCount: 5,
        patterns: null,
      },
      {
        id: "shadow",
        name: "Shadow",
        charges: 100,
        targetsCount: 0,
        patterns: null,
      },
    ],
  },
];
