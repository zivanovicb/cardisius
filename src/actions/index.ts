import axios from "axios";
import {
  MAKE_MOVE,
  END_ROUND,
  SET_NUM_OF_PLAYERS,
  FETCH_DECK_REQUEST,
  FETCH_DECK_FAILURE,
  FETCH_DECK_SUCCESS,
  END_GAME,
  PLAY_AGAIN
} from "./types";
import {
  ITableCard,
  ISetNumOfPlayersAction,
  IMakeMoveAction,
  IEndGameAction,
  IEndRoundAction,
  IPlayAgainAction,
  IFetchDeckRequestAction,
  IFetchDeckSuccessAction,
  IFetchDeckFailureAction,
  ICardFromAPI
} from "../types";
import { CARDS_PER_HAND, GET_DECK_URL } from "../constants";

export const makeMove = (playerName: string, card: ITableCard): IMakeMoveAction => ({
  type: MAKE_MOVE,
  payload: {
    playerName,
    card
  }
});

export const setNumOfPlayers = (n: number): ISetNumOfPlayersAction => ({
  type: SET_NUM_OF_PLAYERS,
  payload: {
    n
  }
});

export const endRound = (): IEndRoundAction => ({
  type: END_ROUND
});

export const endGame = (): IEndGameAction => ({
  type: END_GAME
});

export const playAgain = (): IPlayAgainAction => ({
  type: PLAY_AGAIN
});

export const fetchDeckRequest = (): IFetchDeckRequestAction => ({
  type: FETCH_DECK_REQUEST
});

export const fetchDeckSuccess = (payload: {
  deckID: string;
  cards: Array<ICardFromAPI>;
}): IFetchDeckSuccessAction => ({
  type: FETCH_DECK_SUCCESS,
  payload
});

export const fetchDeckFailure = (err: string): IFetchDeckFailureAction => ({
  type: FETCH_DECK_FAILURE,
  payload: {
    err
  }
});

export const getDeck = (numOfPlayers: number) => async (dispatch: any) => {
  try {
    dispatch(fetchDeckRequest());

    const res = await axios.get(GET_DECK_URL);
    const deckID = res.data.deck_id;
    if (!deckID) throw new Error("deckID null or undefined");

    const {
      data: { cards }
    } = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${numOfPlayers * CARDS_PER_HAND}`);
    if (!cards) throw new Error("cards null or undefined");

    dispatch(fetchDeckSuccess({ deckID, cards }));
    return deckID;
  } catch (err) {
    console.log("STASTA", err.message)
    dispatch(fetchDeckFailure(JSON.stringify(err)));
  }
};
