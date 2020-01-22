import { createStore, compose, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { PLAYERS } from "./constants";
import {
  IState,
  IMakeMoveAction,
  ISetNumOfPlayersAction,
  IFetchDeckRequestAction,
  IFetchDeckSuccessAction,
  IFetchDeckFailureAction,
  ActionType
} from "./types";
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
import { dealCards } from "./utils";

export const initialState: IState = {
  numOfPlayers: undefined,
  players: {},
  deck: [],
  round: 1,
  roundMoves: [],
  inactiveCards: [],
  winners: [],
  isLoading: true,
  err: null,
  deckID: undefined
};

export const reducer = (state: IState = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_NUM_OF_PLAYERS:
      return setNumOfPlayers(state, action);
    case FETCH_DECK_REQUEST:
      return fetchDeckRequest(state, action);
    case FETCH_DECK_SUCCESS:
      return fetchDeckSuccess(state, action);
    case FETCH_DECK_FAILURE:
      return fetchDeckFailure(state, action);
    case END_ROUND:
      return endRound(state);
    case END_GAME:
      return endGame(state);
    case MAKE_MOVE:
      return makeMove(state, action);
    case PLAY_AGAIN:
      return initialState;
    default:
      return state;
  }
};

export const fetchDeckRequest = (state: IState, action: IFetchDeckRequestAction) => {
  return {
    ...state,
    isLoading: true,
    err: null
  };
};

export const fetchDeckSuccess = (state: IState, action: IFetchDeckSuccessAction) => {
  const { playersWithCards, cards } = dealCards(state.players, action.payload.cards);
  return {
    ...state,
    isLoading: false,
    err: null,
    deckID: action.payload.deckID,
    deck: cards,
    players: playersWithCards
  };
};

const fetchDeckFailure = (state: IState, action: IFetchDeckFailureAction) => {
  return {
    ...state,
    isLoading: false,
    err: action.payload.err
  };
};

const makeMove = (state: IState, action: IMakeMoveAction) => {
  const p = state.players[action.payload.playerName];
  const handCards = p.handCards.filter(c => c.code !== action.payload.card.code);

  return {
    ...state,
    players: {
      ...state.players,
      [p.name]: {
        ...p,
        handCards
      }
    },
    roundMoves: [
      ...state.roundMoves,
      {
        playerName: action.payload.playerName,
        card: action.payload.card
      }
    ],
  };
};

const endRound = (state: IState) => {
  const sortedMoves = [...state.roundMoves].sort((a, b) => b.card.value - a.card.value);
  const movesWithHighestValue = state.roundMoves.filter(m => m.card.value === sortedMoves[0].card.value);

  let maxMove = sortedMoves[0];

  // if there are multiple players with the highest card value the last one takes it all
  if (movesWithHighestValue.length > 1) {
    for (let i = 0; i < sortedMoves.length; i++) {
      if (sortedMoves[i].card.value === sortedMoves[0].card.value) maxMove = sortedMoves[i];
    }
  }

  const roundWinner = state.players[maxMove.playerName];
  const roundCards = state.roundMoves.map(m => m.card);
  const sumOfCardValues = [...roundWinner.wonCards, ...roundCards].reduce((acc, c) => acc + c.value, 0);

  return {
    ...state,
    roundMoves: [],
    round: state.round + 1,
    players: {
      ...state.players,
      [roundWinner.name]: {
        ...roundWinner,
        wonCards: [...roundWinner.wonCards, ...roundCards],
        sumOfCardValues
      }
    }
  };
};

const endGame = (state: IState) => {
  const playersSortedByScore = [...Object.values(state.players)].sort((a, b) => b.sumOfCardValues - a.sumOfCardValues);
  const winners = playersSortedByScore.filter(p => p.sumOfCardValues === playersSortedByScore[0].sumOfCardValues);

  return {
    ...state,
    winners
  };
};

const setNumOfPlayers = (state: IState, action: ISetNumOfPlayersAction) => {
  return {
    ...state,
    numOfPlayers: action.payload.n,
    players: Object.keys(PLAYERS)
      .slice(0, action.payload.n)
      .reduce((acc: any, pName) => {
        return {
          ...acc,
          [pName]: PLAYERS[pName]
        };
      }, {})
  };
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<IState, ActionType>)));

export default store;
