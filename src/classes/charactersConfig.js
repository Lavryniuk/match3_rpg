import Paladin from "./Paladin";
import Sorceress from "./Sorceress";
import Archer from "./Archer";

import sorceressAvatar from "../assets/avatars/sorceress.png";
import paladinAvatar from "../assets/avatars/paladin.png";
import archerAvatar from "../assets/avatars/archer.png";

import swordStrike from "../assets/skills/paladin/swordStrike.png";
import shieldPulse from "../assets/skills/paladin/shieldPulse.png";
import meditation from "../assets/skills/paladin/meditation.png";
import meteor from "../assets/skills/sorceress/meteor.png";
import realityDistortion from "../assets/skills/sorceress/realityDistortion.png";
import manaRestore from "../assets/skills/sorceress/manaRestore.png";
import arrowShot from "../assets/skills/archer/arrowShot.png";
import arrowBarrage from "../assets/skills/archer/arrowBarrage.png";
import shadow from "../assets/skills/archer/shadow.png";

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
        sprite: swordStrike,
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
        sprite: shieldPulse,
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
        sprite: meditation,
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
        sprite: meteor,
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
        sprite: realityDistortion,
        charges: 100,
        targetsCount: 5,
        patterns: null,
      },
      {
        id: "manaRestore",
        name: "Mana Restore",
        sprite: manaRestore,
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
        sprite: arrowShot,
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
        sprite: arrowBarrage,
        charges: 100,
        targetsCount: 5,
        patterns: null,
      },
      {
        id: "shadow",
        name: "Shadow",
        sprite: shadow,
        charges: 100,
        targetsCount: 0,
        patterns: null,
      },
    ],
  },
];
