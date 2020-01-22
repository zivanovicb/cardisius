import { IPlayers } from "./types";

export const CARDS_PER_HAND = 10;

export const PLAYER_ONE_NAME = "Human"
export const PLAYER_TWO_NAME = "Antonio Esfandiari"
export const PLAYER_THREE_NAME = "Daniel Colman"
export const PLAYER_FOUR_NAME = "Daniel Negreanu"

export const PLAYERS: IPlayers = {
  [PLAYER_ONE_NAME]: {
    name: PLAYER_ONE_NAME,
    sumOfCardValues: 0,
    wonCards: [],
    handCards: []
  },
  [PLAYER_TWO_NAME]: {
    name: PLAYER_TWO_NAME,
    sumOfCardValues: 0,
    wonCards: [],
    handCards: []
  },
  [PLAYER_THREE_NAME]: {
    name: PLAYER_THREE_NAME,
    sumOfCardValues: 0,
    wonCards: [],
    handCards: []
  },
  [PLAYER_FOUR_NAME]: {
    name: PLAYER_FOUR_NAME,
    sumOfCardValues: 0,
    wonCards: [],
    handCards: []
  }
};

export const GET_DECK_URL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
