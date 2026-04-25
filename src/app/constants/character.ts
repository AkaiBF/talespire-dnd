import { Character } from "../types/character";

export const CharacterPreset: Character = {
  portrait: '',
  name: "Machango",
  playerName: 'Javi',
  class: 13,
  subclass: '',
  level: 2,
  species: 1,
  background: 1,
  alignment: 6,
  size: 3,
  xp: 0,
  abilities: {
    str: { score: 8, mod: -1, save: -1 },
    dex: { score: 11, mod: 0, save: 0 },
    con: { score: 14, mod: 2, save: 4 },
    int: { score: 20, mod: 5, save: 7 },
    wis: { score: 11, mod: 0, save: 0 },
    cha: { score: 14, mod: 2, save: 2 }
  },
  ac: 10,
  initiative: 0,
  speed: 30,
  proficiencyBonus: 2,
  hp: {
    max: 0,
    current: 0,
    temp: 0
  },
  hitDice: '',
  passivePerception: 10,
  passiveInvestigation: 10,
  passiveInsight: 10,
  deathSaves: {
    success1: false,
    success2: false,
    success3: false,
    fail1: false,
    fail2: false,
    fail3: false
  },
  features: '',
  inventory: '',
  personalityTraits: '',
  ideals: '',
  bonds: '',
  flaws: '',
  notes: '',
  spellcasting: {
    ability: null,
    saveDc: 0,
    attackBonus: 0,
    className: '',
    slots: [
      { level: 1, max: 0, used: 0 },
      { level: 2, max: 0, used: 0 },
      { level: 3, max: 0, used: 0 }
    ]
  },
  skills: [
    { key: 1, proficient: false, expertise: false },
    { key: 2, proficient: false, expertise: false },
    { key: 3, proficient: false, expertise: false },
    { key: 4, proficient: false, expertise: false },
    { key: 5, proficient: false, expertise: false },
    { key: 6, proficient: true, expertise: false },
    { key: 7, proficient: false, expertise: false },
    { key: 8, proficient: false, expertise: false },
    { key: 9, proficient: false, expertise: false },
    { key: 10, proficient: false, expertise: false },
    { key: 11, proficient: false, expertise: false },
    { key: 12, proficient: false, expertise: false },
    { key: 13, proficient: false, expertise: false },
    { key: 14, proficient: false, expertise: false },
    { key: 15, proficient: false, expertise: false },
    { key: 16, proficient: true, expertise: false },
    { key: 17, proficient: true, expertise: false },
    { key: 18, proficient: true, expertise: false }
  ]
};