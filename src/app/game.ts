import { Player } from './player';

export interface Game {
  id: number;
  players: Player[];
  //private ArrayList<Round> rounds;
  scoringLimit: number;
  currentDealerPosition: number;
  currentRoundNumber: number;
}
