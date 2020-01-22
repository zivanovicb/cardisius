import { reducer } from "../store";
import { PLAYER_ONE_NAME, PLAYER_TWO_NAME, PLAYER_THREE_NAME, PLAYER_FOUR_NAME } from "../constants";
import {
  setNumOfPlayers,
  fetchDeckRequest,
  fetchDeckSuccess,
  fetchDeckFailure,
  makeMove,
  endRound,
  endGame,
  playAgain
} from "../actions";
import { initialState } from "../store";

describe("rootReducer", () => {
  describe("setNumOfPlayers action", () => {
    it("should assign player objects", () => {
      const state = reducer(undefined, setNumOfPlayers(4));
      expect(Object.keys(state.players).length).toBe(4);
      const initialPlayer = {
        sumOfCardValues: 0,
        wonCards: [],
        handCards: []
      };
      expect(state.players[PLAYER_ONE_NAME]).toStrictEqual({ ...initialPlayer, name: PLAYER_ONE_NAME });
      expect(state.players[PLAYER_TWO_NAME]).toStrictEqual({ ...initialPlayer, name: PLAYER_TWO_NAME });
      expect(state.players[PLAYER_THREE_NAME]).toStrictEqual({ ...initialPlayer, name: PLAYER_THREE_NAME });
      expect(state.players[PLAYER_FOUR_NAME]).toStrictEqual({ ...initialPlayer, name: PLAYER_FOUR_NAME });
    });
  });

  describe("fetchDeckRequest action", () => {
    it("should set loading to true", () => {
      const state = reducer(undefined, fetchDeckRequest());
      expect(state.isLoading).toBe(true);
    });

    it("should set err to null if there is any", () => {
      const state = reducer({ ...initialState, err: "There was some error before!" }, fetchDeckRequest());
      expect(state.err).toBe(null);
    });
  });

  describe("fetchDeckSuccess action", () => {
    it("should set isLoading to false", () => {
      const state = reducer(
        undefined,
        fetchDeckSuccess({ deckID: responseFromAPI.deck_id, cards: responseFromAPI.cards })
      );
      expect(state.isLoading).toBe(false);
    });

    it("should set err to null if there is any", () => {
      const state = reducer(
        { ...initialState, err: "Someething went wrong!" },
        fetchDeckSuccess({ deckID: responseFromAPI.deck_id, cards: responseFromAPI.cards })
      );
      expect(state.err).toBe(null);
    });

    it("should set deckID", () => {
      const state = reducer(
        { ...initialState, err: "Someething went wrong!" },
        fetchDeckSuccess({ deckID: responseFromAPI.deck_id, cards: responseFromAPI.cards })
      );

      expect(state.deckID).toBe(responseFromAPI.deck_id);
    });

    it("should set deck if no players there are no players", () => {
      const state = reducer(
        undefined,
        fetchDeckSuccess({ deckID: responseFromAPI.deck_id, cards: responseFromAPI.cards })
      );

      expect(state.deck.length).toBe(40);
    });

    it("should deal cards to players", () => {
      const stateWithPlayers = reducer(undefined, setNumOfPlayers(4));
      const state = reducer(
        stateWithPlayers,
        fetchDeckSuccess({ deckID: responseFromAPI.deck_id, cards: [...responseFromAPI.cards] })
      );
      expect(state.players[PLAYER_ONE_NAME].handCards).toEqual(playerOneHandCards);
      expect(state.players[PLAYER_TWO_NAME].handCards).toEqual(playerTwoHandCards);
      expect(state.players[PLAYER_THREE_NAME].handCards).toEqual(playerThreeHandCards);
      expect(state.players[PLAYER_FOUR_NAME].handCards).toEqual(playerFourHandCards);
      expect(state.deck.length).toEqual(0);
    });
  });

  describe("fetchDeckFailure action", () => {
    it("should set isLoading to false", () => {
      const state = reducer(undefined, fetchDeckFailure("Something went wrong"));
      expect(state.isLoading).toBe(false);
    });

    it("should set err", () => {
      const errMsg = "Something went wrong";
      const state = reducer(undefined, fetchDeckFailure(errMsg));
      expect(state.err).toBe(errMsg);
    });
  });

  describe("makeMove action", () => {
    it("should remove a card from players hands", () => {
      const card = {
        code: "9C",
        img: "__a-a__",
        value: 14
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            [PLAYER_ONE_NAME]: {
              name: PLAYER_ONE_NAME,
              wonCards: [],
              handCards: [
                {
                  value: card.value,
                  images: {
                    png: card.img,
                    svg: card.img
                  },
                  image: card.img,
                  suit: "mhm",
                  code: card.code
                }
              ],
              sumOfCardValues: 0
            }
          }
        },
        makeMove(PLAYER_ONE_NAME, card)
      );

      expect(state.players[PLAYER_ONE_NAME].handCards.length).toBe(0);
    });

    it("should add played card to the roundMoves", () => {
      const card = {
        code: "9C",
        img: "__a-a__",
        value: 14
      };

      const move = {
        playerName: PLAYER_ONE_NAME,
        card
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            [PLAYER_ONE_NAME]: {
              name: PLAYER_ONE_NAME,
              wonCards: [],
              handCards: [
                {
                  value: card.value,
                  images: {
                    png: card.img,
                    svg: card.img
                  },
                  image: card.img,
                  suit: "mhm",
                  code: card.code
                }
              ],
              sumOfCardValues: 0
            }
          }
        },
        makeMove(PLAYER_ONE_NAME, card)
      );

      expect(state.players[PLAYER_ONE_NAME].handCards.length).toBe(0);
      expect(state.roundMoves.length).toBe(1);
      expect(state.roundMoves[0]).toEqual(move);
    });
  });

  describe("endRound action", () => {
    it("should set roundMoves to an empty array", () => {
      const tableCard = {
        code: "9C",
        img: "__a-a__",
        value: 14
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            [PLAYER_ONE_NAME]: {
              name: PLAYER_ONE_NAME,
              handCards: [
                {
                  value: tableCard.value,
                  images: {
                    png: tableCard.img,
                    svg: tableCard.img
                  },
                  image: tableCard.img,
                  suit: "___",
                  code: tableCard.code
                }
              ],
              wonCards: [],
              sumOfCardValues: 0
            }
          },
          roundMoves: [
            {
              playerName: PLAYER_ONE_NAME,
              card: tableCard
            }
          ]
        },
        endRound()
      );

      expect(state.roundMoves.length).toBe(0);
    });

    it("should increment round", () => {
      const tableCard = {
        code: "9C",
        img: "__a-a__",
        value: 14
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            [PLAYER_ONE_NAME]: {
              name: PLAYER_ONE_NAME,
              handCards: [
                {
                  value: tableCard.value,
                  images: {
                    png: tableCard.img,
                    svg: tableCard.img
                  },
                  image: tableCard.img,
                  suit: "___",
                  code: tableCard.code
                }
              ],
              wonCards: [],
              sumOfCardValues: 0
            }
          },
          roundMoves: [
            {
              playerName: PLAYER_ONE_NAME,
              card: tableCard
            }
          ]
        },
        endRound()
      );

      expect(state.round).toEqual(2);
    });

    it("round winner is the one with the highest card in the roundMoves", () => {
      const playerName = PLAYER_ONE_NAME;
      const playerTwoName = PLAYER_TWO_NAME;
      const playerThreeName = PLAYER_THREE_NAME;

      const tableCard = {
        code: "9C",
        img: "__a-a__",
        value: 5
      };

      const tableCardTwo = {
        code: "5A",
        img: "__a-a__",
        value: 14
      };

      const tableCardThree = {
        code: "5A",
        img: "__a-a__",
        value: 10
      };

      const emptyPlayerEntry = {
        handCards: [],
        wonCards: [],
        sumOfCardValues: 0
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            [playerName]: {
              name: playerName,
              ...emptyPlayerEntry
            },
            [playerTwoName]: {
              name: playerTwoName,
              ...emptyPlayerEntry
            },
            [playerThreeName]: {
              name: playerThreeName,
              ...emptyPlayerEntry
            }
          },
          roundMoves: [
            {
              playerName: PLAYER_ONE_NAME,
              card: tableCard
            },
            {
              playerName: PLAYER_TWO_NAME,
              card: tableCardTwo
            },
            {
              playerName: PLAYER_THREE_NAME,
              card: tableCardThree
            }
          ]
        },
        endRound()
      );

      expect(state.players[PLAYER_TWO_NAME].sumOfCardValues).toBe(29);
      expect(state.players[PLAYER_TWO_NAME].wonCards).toStrictEqual([tableCard, tableCardTwo, tableCardThree]);
      expect(state.players[PLAYER_TWO_NAME].handCards.length).toBe(0);

      expect(state.players[PLAYER_ONE_NAME].sumOfCardValues).toBe(0);
      expect(state.players[PLAYER_ONE_NAME].wonCards.length).toBe(0);
      expect(state.players[PLAYER_ONE_NAME].handCards.length).toBe(0);

      expect(state.players[PLAYER_THREE_NAME].sumOfCardValues).toBe(0);
      expect(state.players[PLAYER_THREE_NAME].wonCards.length).toBe(0);
      expect(state.players[PLAYER_THREE_NAME].handCards.length).toBe(0);
    });

    it("if there are multiple highest cards the player who played the last one takes it all", () => {
      const playerName = PLAYER_ONE_NAME;
      const playerTwoName = PLAYER_TWO_NAME;
      const playerThreeName = PLAYER_THREE_NAME;

      const tableCard = {
        code: "9C",
        img: "__a-a__",
        value: 14
      };

      const tableCardTwo = {
        code: "5A",
        img: "__a-a__",
        value: 14
      };

      const tableCardThree = {
        code: "5A",
        img: "__a-a__",
        value: 10
      };

      const emptyPlayerEntry = {
        handCards: [],
        wonCards: [],
        sumOfCardValues: 0
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            [playerName]: {
              name: playerName,
              ...emptyPlayerEntry
            },
            [playerTwoName]: {
              name: playerTwoName,
              ...emptyPlayerEntry
            },
            [playerThreeName]: {
              name: playerThreeName,
              ...emptyPlayerEntry
            }
          },
          roundMoves: [
            {
              playerName: PLAYER_ONE_NAME,
              card: tableCard
            },
            {
              playerName: PLAYER_TWO_NAME,
              card: tableCardTwo
            },
            {
              playerName: PLAYER_THREE_NAME,
              card: tableCardThree
            }
          ]
        },
        endRound()
      );

      expect(state.players[PLAYER_TWO_NAME].sumOfCardValues).toBe(38);
      expect(state.players[PLAYER_TWO_NAME].wonCards).toStrictEqual([tableCard, tableCardTwo, tableCardThree]);
      expect(state.players[PLAYER_TWO_NAME].handCards.length).toBe(0);

      expect(state.players[PLAYER_ONE_NAME].sumOfCardValues).toBe(0);
      expect(state.players[PLAYER_ONE_NAME].wonCards.length).toBe(0);
      expect(state.players[PLAYER_ONE_NAME].handCards.length).toBe(0);

      expect(state.players[PLAYER_THREE_NAME].sumOfCardValues).toBe(0);
      expect(state.players[PLAYER_THREE_NAME].wonCards.length).toBe(0);
      expect(state.players[PLAYER_THREE_NAME].handCards.length).toBe(0);
    });
  });

  describe("endGame action", () => {
    it("should return only one winner", () => {
      const winnerName = PLAYER_TWO_NAME;
      const winner = {
        name: PLAYER_TWO_NAME,
        handCards: [],
        wonCards: [],
        sumOfCardValues: 38
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            Human: {
              name: "Human",
              handCards: [],
              wonCards: [],
              sumOfCardValues: 0
            },
            [winnerName]: winner,
            "Daniel Colman": {
              name: "Daniel Colman",
              handCards: [],
              wonCards: [],
              sumOfCardValues: 0
            }
          }
        },
        endGame()
      );

      expect(state.winners.length).toBe(1);
      expect(state.winners).toStrictEqual([winner]);
    });

    it("should have multiple winners if there are multiple players with winning score", () => {
      const winnerName = PLAYER_TWO_NAME;
      const winnerTwoName = PLAYER_THREE_NAME;

      const winner = {
        handCards: [],
        wonCards: [],
        sumOfCardValues: 38
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            Human: {
              name: "Human",
              handCards: [],
              wonCards: [],
              sumOfCardValues: 0
            },
            [winnerName]: {
              name: winnerName,
              ...winner
            },
            [winnerTwoName]: {
              name: winnerTwoName,
              ...winner
            }
          }
        },
        endGame()
      );

      expect(state.winners.length).toBe(2);
      expect(state.winners).toStrictEqual([
        {
          name: winnerName,
          ...winner
        },
        {
          name: winnerTwoName,
          ...winner
        }
      ]);
    });
  });

  describe("playAgain action", () => {
    it("should revert state to initialState", () => {
      const playerName = PLAYER_ONE_NAME;
      const playerTwoName = PLAYER_TWO_NAME;
      const playerThreeName = PLAYER_THREE_NAME;

      const tableCard = {
        code: "9C",
        img: "__a-a__",
        value: 14
      };

      const tableCardTwo = {
        code: "5A",
        img: "__a-a__",
        value: 14
      };

      const tableCardThree = {
        code: "5A",
        img: "__a-a__",
        value: 10
      };

      const emptyPlayerEntry = {
        handCards: [],
        wonCards: [],
        sumOfCardValues: 0
      };

      const state = reducer(
        {
          ...initialState,
          players: {
            [playerName]: {
              name: playerName,
              ...emptyPlayerEntry
            },
            [playerTwoName]: {
              name: playerTwoName,
              ...emptyPlayerEntry
            },
            [playerThreeName]: {
              name: playerThreeName,
              ...emptyPlayerEntry
            }
          },
          roundMoves: [
            {
              playerName: PLAYER_ONE_NAME,
              card: tableCard
            },
            {
              playerName: PLAYER_TWO_NAME,
              card: tableCardTwo
            },
            {
              playerName: PLAYER_THREE_NAME,
              card: tableCardThree
            }
          ]
        },
        playAgain()
      );

      expect(state).toStrictEqual(initialState);
    });
  });
});

const responseFromAPI = {
  remaining: 12,
  deck_id: "9j5we5p2g1yj",
  cards: [
    {
      value: "3",
      code: "3C",
      images: {
        svg: "https://deckofcardsapi.com/static/img/3C.svg",
        png: "https://deckofcardsapi.com/static/img/3C.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/3C.png"
    },
    {
      value: "KING",
      code: "KH",
      images: {
        svg: "https://deckofcardsapi.com/static/img/KH.svg",
        png: "https://deckofcardsapi.com/static/img/KH.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/KH.png"
    },
    {
      value: "9",
      code: "9H",
      images: {
        svg: "https://deckofcardsapi.com/static/img/9H.svg",
        png: "https://deckofcardsapi.com/static/img/9H.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/9H.png"
    },
    {
      value: "6",
      code: "6D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/6D.svg",
        png: "https://deckofcardsapi.com/static/img/6D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/6D.png"
    },
    {
      value: "3",
      code: "3D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/3D.svg",
        png: "https://deckofcardsapi.com/static/img/3D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/3D.png"
    },
    {
      value: "4",
      code: "4S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/4S.svg",
        png: "https://deckofcardsapi.com/static/img/4S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/4S.png"
    },
    {
      value: "KING",
      code: "KS",
      images: {
        svg: "https://deckofcardsapi.com/static/img/KS.svg",
        png: "https://deckofcardsapi.com/static/img/KS.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/KS.png"
    },
    {
      value: "6",
      code: "6S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/6S.svg",
        png: "https://deckofcardsapi.com/static/img/6S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/6S.png"
    },
    {
      value: "10",
      code: "0H",
      images: {
        svg: "https://deckofcardsapi.com/static/img/0H.svg",
        png: "https://deckofcardsapi.com/static/img/0H.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/0H.png"
    },
    {
      value: "7",
      code: "7D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/7D.svg",
        png: "https://deckofcardsapi.com/static/img/7D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/7D.png"
    },
    {
      value: "KING",
      code: "KC",
      images: {
        svg: "https://deckofcardsapi.com/static/img/KC.svg",
        png: "https://deckofcardsapi.com/static/img/KC.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/KC.png"
    },
    {
      value: "6",
      code: "6C",
      images: {
        svg: "https://deckofcardsapi.com/static/img/6C.svg",
        png: "https://deckofcardsapi.com/static/img/6C.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/6C.png"
    },
    {
      value: "8",
      code: "8S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/8S.svg",
        png: "https://deckofcardsapi.com/static/img/8S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/8S.png"
    },
    {
      value: "KING",
      code: "KD",
      images: {
        svg: "https://deckofcardsapi.com/static/img/KD.svg",
        png: "https://deckofcardsapi.com/static/img/KD.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/KD.png"
    },
    {
      value: "ACE",
      code: "AC",
      images: {
        svg: "https://deckofcardsapi.com/static/img/AC.svg",
        png: "https://deckofcardsapi.com/static/img/AC.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/AC.png"
    },
    {
      value: "QUEEN",
      code: "QH",
      images: {
        svg: "https://deckofcardsapi.com/static/img/QH.svg",
        png: "https://deckofcardsapi.com/static/img/QH.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/QH.png"
    },
    {
      value: "QUEEN",
      code: "QD",
      images: {
        svg: "https://deckofcardsapi.com/static/img/QD.svg",
        png: "https://deckofcardsapi.com/static/img/QD.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/QD.png"
    },
    {
      value: "8",
      code: "8C",
      images: {
        svg: "https://deckofcardsapi.com/static/img/8C.svg",
        png: "https://deckofcardsapi.com/static/img/8C.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/8C.png"
    },
    {
      value: "10",
      code: "0C",
      images: {
        svg: "https://deckofcardsapi.com/static/img/0C.svg",
        png: "https://deckofcardsapi.com/static/img/0C.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/0C.png"
    },
    {
      value: "3",
      code: "3H",
      images: {
        svg: "https://deckofcardsapi.com/static/img/3H.svg",
        png: "https://deckofcardsapi.com/static/img/3H.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/3H.png"
    },
    {
      value: "2",
      code: "2D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/2D.svg",
        png: "https://deckofcardsapi.com/static/img/2D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/2D.png"
    },
    {
      value: "7",
      code: "7H",
      images: {
        svg: "https://deckofcardsapi.com/static/img/7H.svg",
        png: "https://deckofcardsapi.com/static/img/7H.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/7H.png"
    },
    {
      value: "QUEEN",
      code: "QC",
      images: {
        svg: "https://deckofcardsapi.com/static/img/QC.svg",
        png: "https://deckofcardsapi.com/static/img/QC.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/QC.png"
    },
    {
      value: "4",
      code: "4D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/4D.svg",
        png: "https://deckofcardsapi.com/static/img/4D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/4D.png"
    },
    {
      value: "10",
      code: "0D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/0D.svg",
        png: "https://deckofcardsapi.com/static/img/0D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/0D.png"
    },
    {
      value: "3",
      code: "3S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/3S.svg",
        png: "https://deckofcardsapi.com/static/img/3S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/3S.png"
    },
    {
      value: "JACK",
      code: "JC",
      images: {
        svg: "https://deckofcardsapi.com/static/img/JC.svg",
        png: "https://deckofcardsapi.com/static/img/JC.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/JC.png"
    },
    {
      value: "8",
      code: "8H",
      images: {
        svg: "https://deckofcardsapi.com/static/img/8H.svg",
        png: "https://deckofcardsapi.com/static/img/8H.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/8H.png"
    },
    {
      value: "9",
      code: "9D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/9D.svg",
        png: "https://deckofcardsapi.com/static/img/9D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/9D.png"
    },
    {
      value: "5",
      code: "5C",
      images: {
        svg: "https://deckofcardsapi.com/static/img/5C.svg",
        png: "https://deckofcardsapi.com/static/img/5C.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/5C.png"
    },
    {
      value: "JACK",
      code: "JH",
      images: {
        svg: "https://deckofcardsapi.com/static/img/JH.svg",
        png: "https://deckofcardsapi.com/static/img/JH.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/JH.png"
    },
    {
      value: "6",
      code: "6H",
      images: {
        svg: "https://deckofcardsapi.com/static/img/6H.svg",
        png: "https://deckofcardsapi.com/static/img/6H.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/6H.png"
    },
    {
      value: "ACE",
      code: "AD",
      images: {
        svg: "https://deckofcardsapi.com/static/img/AD.svg",
        png: "https://deckofcardsapi.com/static/img/AD.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/aceDiamonds.png"
    },
    {
      value: "8",
      code: "8D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/8D.svg",
        png: "https://deckofcardsapi.com/static/img/8D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/8D.png"
    },
    {
      value: "5",
      code: "5D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/5D.svg",
        png: "https://deckofcardsapi.com/static/img/5D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/5D.png"
    },
    {
      value: "9",
      code: "9C",
      images: {
        svg: "https://deckofcardsapi.com/static/img/9C.svg",
        png: "https://deckofcardsapi.com/static/img/9C.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/9C.png"
    },
    {
      value: "5",
      code: "5S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/5S.svg",
        png: "https://deckofcardsapi.com/static/img/5S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/5S.png"
    },
    {
      value: "10",
      code: "0S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/0S.svg",
        png: "https://deckofcardsapi.com/static/img/0S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/0S.png"
    },
    {
      value: "JACK",
      code: "JS",
      images: {
        svg: "https://deckofcardsapi.com/static/img/JS.svg",
        png: "https://deckofcardsapi.com/static/img/JS.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/JS.png"
    },
    {
      value: "2",
      code: "2H",
      images: {
        svg: "https://deckofcardsapi.com/static/img/2H.svg",
        png: "https://deckofcardsapi.com/static/img/2H.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/2H.png"
    }
  ],
  success: true
};

const playerOneHandCards = [
  {
    value: 3,
    code: "3C",
    images: {
      svg: "https://deckofcardsapi.com/static/img/3C.svg",
      png: "https://deckofcardsapi.com/static/img/3C.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/3C.png"
  },
  {
    value: 14,
    code: "KH",
    images: {
      svg: "https://deckofcardsapi.com/static/img/KH.svg",
      png: "https://deckofcardsapi.com/static/img/KH.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/KH.png"
  },
  {
    value: 9,
    code: "9H",
    images: {
      svg: "https://deckofcardsapi.com/static/img/9H.svg",
      png: "https://deckofcardsapi.com/static/img/9H.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/9H.png"
  },
  {
    value: 6,
    code: "6D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/6D.svg",
      png: "https://deckofcardsapi.com/static/img/6D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/6D.png"
  },
  {
    value: 3,
    code: "3D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/3D.svg",
      png: "https://deckofcardsapi.com/static/img/3D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/3D.png"
  },
  {
    value: 4,
    code: "4S",
    images: {
      svg: "https://deckofcardsapi.com/static/img/4S.svg",
      png: "https://deckofcardsapi.com/static/img/4S.png"
    },
    suit: "SPADES",
    image: "https://deckofcardsapi.com/static/img/4S.png"
  },
  {
    value: 14,
    code: "KS",
    images: {
      svg: "https://deckofcardsapi.com/static/img/KS.svg",
      png: "https://deckofcardsapi.com/static/img/KS.png"
    },
    suit: "SPADES",
    image: "https://deckofcardsapi.com/static/img/KS.png"
  },
  {
    value: 6,
    code: "6S",
    images: {
      svg: "https://deckofcardsapi.com/static/img/6S.svg",
      png: "https://deckofcardsapi.com/static/img/6S.png"
    },
    suit: "SPADES",
    image: "https://deckofcardsapi.com/static/img/6S.png"
  },
  {
    value: 10,
    code: "0H",
    images: {
      svg: "https://deckofcardsapi.com/static/img/0H.svg",
      png: "https://deckofcardsapi.com/static/img/0H.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/0H.png"
  },
  {
    value: 7,
    code: "7D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/7D.svg",
      png: "https://deckofcardsapi.com/static/img/7D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/7D.png"
  }
];

const playerTwoHandCards = [
  {
    value: 14,
    code: "KC",
    images: {
      svg: "https://deckofcardsapi.com/static/img/KC.svg",
      png: "https://deckofcardsapi.com/static/img/KC.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/KC.png"
  },
  {
    value: 6,
    code: "6C",
    images: {
      svg: "https://deckofcardsapi.com/static/img/6C.svg",
      png: "https://deckofcardsapi.com/static/img/6C.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/6C.png"
  },
  {
    value: 8,
    code: "8S",
    images: {
      svg: "https://deckofcardsapi.com/static/img/8S.svg",
      png: "https://deckofcardsapi.com/static/img/8S.png"
    },
    suit: "SPADES",
    image: "https://deckofcardsapi.com/static/img/8S.png"
  },
  {
    value: 14,
    code: "KD",
    images: {
      svg: "https://deckofcardsapi.com/static/img/KD.svg",
      png: "https://deckofcardsapi.com/static/img/KD.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/KD.png"
  },
  {
    value: 1,
    code: "AC",
    images: {
      svg: "https://deckofcardsapi.com/static/img/AC.svg",
      png: "https://deckofcardsapi.com/static/img/AC.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/AC.png"
  },
  {
    value: 13,
    code: "QH",
    images: {
      svg: "https://deckofcardsapi.com/static/img/QH.svg",
      png: "https://deckofcardsapi.com/static/img/QH.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/QH.png"
  },
  {
    value: 13,
    code: "QD",
    images: {
      svg: "https://deckofcardsapi.com/static/img/QD.svg",
      png: "https://deckofcardsapi.com/static/img/QD.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/QD.png"
  },
  {
    value: 8,
    code: "8C",
    images: {
      svg: "https://deckofcardsapi.com/static/img/8C.svg",
      png: "https://deckofcardsapi.com/static/img/8C.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/8C.png"
  },
  {
    value: 10,
    code: "0C",
    images: {
      svg: "https://deckofcardsapi.com/static/img/0C.svg",
      png: "https://deckofcardsapi.com/static/img/0C.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/0C.png"
  },
  {
    value: 3,
    code: "3H",
    images: {
      svg: "https://deckofcardsapi.com/static/img/3H.svg",
      png: "https://deckofcardsapi.com/static/img/3H.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/3H.png"
  }
];

const playerThreeHandCards = [
  {
    value: 2,
    code: "2D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/2D.svg",
      png: "https://deckofcardsapi.com/static/img/2D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/2D.png"
  },
  {
    value: 7,
    code: "7H",
    images: {
      svg: "https://deckofcardsapi.com/static/img/7H.svg",
      png: "https://deckofcardsapi.com/static/img/7H.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/7H.png"
  },
  {
    value: 13,
    code: "QC",
    images: {
      svg: "https://deckofcardsapi.com/static/img/QC.svg",
      png: "https://deckofcardsapi.com/static/img/QC.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/QC.png"
  },
  {
    value: 4,
    code: "4D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/4D.svg",
      png: "https://deckofcardsapi.com/static/img/4D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/4D.png"
  },
  {
    value: 10,
    code: "0D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/0D.svg",
      png: "https://deckofcardsapi.com/static/img/0D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/0D.png"
  },
  {
    value: 3,
    code: "3S",
    images: {
      svg: "https://deckofcardsapi.com/static/img/3S.svg",
      png: "https://deckofcardsapi.com/static/img/3S.png"
    },
    suit: "SPADES",
    image: "https://deckofcardsapi.com/static/img/3S.png"
  },
  {
    value: 12,
    code: "JC",
    images: {
      svg: "https://deckofcardsapi.com/static/img/JC.svg",
      png: "https://deckofcardsapi.com/static/img/JC.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/JC.png"
  },
  {
    value: 8,
    code: "8H",
    images: {
      svg: "https://deckofcardsapi.com/static/img/8H.svg",
      png: "https://deckofcardsapi.com/static/img/8H.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/8H.png"
  },
  {
    value: 9,
    code: "9D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/9D.svg",
      png: "https://deckofcardsapi.com/static/img/9D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/9D.png"
  },
  {
    value: 5,
    code: "5C",
    images: {
      svg: "https://deckofcardsapi.com/static/img/5C.svg",
      png: "https://deckofcardsapi.com/static/img/5C.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/5C.png"
  }
];

const playerFourHandCards = [
  {
    value: 12,
    code: "JH",
    images: {
      svg: "https://deckofcardsapi.com/static/img/JH.svg",
      png: "https://deckofcardsapi.com/static/img/JH.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/JH.png"
  },
  {
    value: 6,
    code: "6H",
    images: {
      svg: "https://deckofcardsapi.com/static/img/6H.svg",
      png: "https://deckofcardsapi.com/static/img/6H.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/6H.png"
  },
  {
    value: 1,
    code: "AD",
    images: {
      svg: "https://deckofcardsapi.com/static/img/AD.svg",
      png: "https://deckofcardsapi.com/static/img/AD.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/aceDiamonds.png"
  },
  {
    value: 8,
    code: "8D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/8D.svg",
      png: "https://deckofcardsapi.com/static/img/8D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/8D.png"
  },
  {
    value: 5,
    code: "5D",
    images: {
      svg: "https://deckofcardsapi.com/static/img/5D.svg",
      png: "https://deckofcardsapi.com/static/img/5D.png"
    },
    suit: "DIAMONDS",
    image: "https://deckofcardsapi.com/static/img/5D.png"
  },
  {
    value: 9,
    code: "9C",
    images: {
      svg: "https://deckofcardsapi.com/static/img/9C.svg",
      png: "https://deckofcardsapi.com/static/img/9C.png"
    },
    suit: "CLUBS",
    image: "https://deckofcardsapi.com/static/img/9C.png"
  },
  {
    value: 5,
    code: "5S",
    images: {
      svg: "https://deckofcardsapi.com/static/img/5S.svg",
      png: "https://deckofcardsapi.com/static/img/5S.png"
    },
    suit: "SPADES",
    image: "https://deckofcardsapi.com/static/img/5S.png"
  },
  {
    value: 10,
    code: "0S",
    images: {
      svg: "https://deckofcardsapi.com/static/img/0S.svg",
      png: "https://deckofcardsapi.com/static/img/0S.png"
    },
    suit: "SPADES",
    image: "https://deckofcardsapi.com/static/img/0S.png"
  },
  {
    value: 12,
    code: "JS",
    images: {
      svg: "https://deckofcardsapi.com/static/img/JS.svg",
      png: "https://deckofcardsapi.com/static/img/JS.png"
    },
    suit: "SPADES",
    image: "https://deckofcardsapi.com/static/img/JS.png"
  },
  {
    value: 2,
    code: "2H",
    images: {
      svg: "https://deckofcardsapi.com/static/img/2H.svg",
      png: "https://deckofcardsapi.com/static/img/2H.png"
    },
    suit: "HEARTS",
    image: "https://deckofcardsapi.com/static/img/2H.png"
  }
];
