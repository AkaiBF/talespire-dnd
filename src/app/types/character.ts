export type CharSkill = {
  key: number;
  proficient: boolean;
  expertise: boolean;
}

export type CharAbilities = {
  str: { score: number, mod: number, save: number },
  dex: { score: number, mod: number, save: number },
  con: { score: number, mod: number, save: number },
  int: { score: number, mod: number, save: number },
  wis: { score: number, mod: number, save: number },
  cha: { score: number, mod: number, save: number }
}

export type CharHP = {
  max: number;
  current: number;
  temp: number;
}

export type Character = {
  portrait: string,
  name: string,
  playerName: string,
  class: number,
  subclass: string,
  level: number,
  species: number,
  background: number,
  alignment: number,
  size: number,
  xp: number,
  abilities: CharAbilities,
  ac: number,
  initiative: number,
  speed: number,
  proficiencyBonus: number,
  hp: CharHP,
  hitDice: string,
  passivePerception: number,
  passiveInvestigation: number,
  passiveInsight: number,
  deathSaves: {
    success1: boolean,
    success2: boolean,
    success3: boolean,
    fail1: boolean,
    fail2: boolean,
    fail3: boolean
  },
  features: string,
  inventory: string,
  personalityTraits: string,
  ideals: string,
  bonds: string,
  flaws: string,
  notes: string,
  spellcasting: {
    ability: number | null,
    saveDc: number,
    attackBonus: number,
    className: string,
    slots: [
      { level: 1, max: number, used: number },
      { level: 2, max: number, used: number },
      { level: 3, max: number, used: number }
    ]
  },
  skills: CharSkill[]
};