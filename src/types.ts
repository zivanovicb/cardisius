import {
  MAKE_MOVE,
  SET_NUM_OF_PLAYERS,
  FETCH_DECK_REQUEST,
  FETCH_DECK_FAILURE,
  FETCH_DECK_SUCCESS,
  END_ROUND,
  END_GAME,
  PLAY_AGAIN
} from "./actions/types";

export interface ICard {
  value: number;
  images: {
    png: string;
    svg: string;
  };
  image: string;
  suit: string;
  code: string;
}

export interface ICardFromAPI extends Omit<ICard, "value"> {
  value: string;
}

export interface ITableCard {
  code: string;
  img: string;
  value: number;
}

export interface IPlayer {
  name: string;
  sumOfCardValues: number;
  handCards: Array<ICard>;
  wonCards: Array<ITableCard>;
}

export interface IMove {
  playerName: string;
  card: ITableCard;
}

export interface IPlayers {
  [key: string]: IPlayer;
}

export interface IState {
  numOfPlayers: number | undefined;
  round: number;
  deckID: string | undefined;
  isLoading: boolean;
  err: null | string;
  deck: Array<ICard>;
  inactiveCards: Array<ITableCard>;
  players: IPlayers;
  winners: Array<IPlayer>;
  roundMoves: Array<IMove>;
}

export interface IMakeMoveAction {
  type: typeof MAKE_MOVE;
  payload: {
    playerName: string;
    card: ITableCard;
  };
}

export interface IEndRoundAction {
  type: typeof END_ROUND;
}

export interface IEndGameAction {
  type: typeof END_GAME;
}

export interface IPlayAgainAction {
  type: typeof PLAY_AGAIN;
}

export interface ISetNumOfPlayersAction {
  type: typeof SET_NUM_OF_PLAYERS;
  payload: {
    n: number;
  };
}

export interface IFetchDeckRequestAction {
  type: typeof FETCH_DECK_REQUEST;
}

export interface IFetchDeckSuccessAction {
  type: typeof FETCH_DECK_SUCCESS;
  payload: {
    deckID: string;
    cards: Array<ICardFromAPI>;
  };
}

export interface IFetchDeckFailureAction {
  type: typeof FETCH_DECK_FAILURE;
  payload: {
    err: string;
  };
}

type IFetchDeckActionType = IFetchDeckRequestAction | IFetchDeckSuccessAction | IFetchDeckFailureAction;

export type ActionType =
  | IMakeMoveAction
  | ISetNumOfPlayersAction
  | IFetchDeckActionType
  | IEndRoundAction
  | IEndGameAction
  | IPlayAgainAction;
