export type GameMode = 'flag' | 'capital';

export interface Country {
  name: string;
  flag: string;
  capital?: string;
  iso2?: string;
  iso3?: string;
}

export interface PlayerScore {
  id: string;
  playerName: string;
  score: number;
  mode: GameMode;
  date: string;
}