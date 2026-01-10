import Paladin from "./Paladin";
import Sorceress from "./Sorceress";
import Archer from "./Archer";

export const characters = [
  {
    id: "paladin",
    name: "Paladin",
    avatar: "../assets/avatars/paladin.png",
    classRef: Paladin,
  },
  {
    id: "sorceress",
    name: "Sorceress",
    avatar: "../assets/avatars/sorceress.png",
    classRef: Sorceress,
  },
  {
    id: "archer",
    name: "Archer",
    avatar: "../assets/avatars/archer.png",
    classRef: Archer,
  },
];
