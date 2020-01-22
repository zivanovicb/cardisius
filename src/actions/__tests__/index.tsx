import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../store";
import { GET_DECK_URL } from "../../constants";
import { getDeck, fetchDeckRequest, fetchDeckSuccess, fetchDeckFailure } from "../";

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should dispatch success action if fetching successfull", () => {
    const deckID = "randomdeckid";
    mock.onGet(GET_DECK_URL).reply(200, { deck_id: deckID });
    mock.onGet(`https://deckofcardsapi.com/api/deck/randomdeckid/draw/?count=40`).reply(200, {
      cards: getShuffledDeckResponse.cards
    });
    const store = mockStore(initialState);
    const expectedActions = [fetchDeckRequest(), fetchDeckSuccess({ deckID, cards: getShuffledDeckResponse.cards })];

    // @ts-ignore
    return store.dispatch(getDeck(4)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should dispatch failure action if fetching deck fails", () => {
    mock.onGet(GET_DECK_URL).reply(400);
    mock.onGet(`https://deckofcardsapi.com/api/deck/randomdeckid/draw/?count=40`).networkError();
    const store = mockStore(initialState);

    // @ts-ignore
    return store.dispatch(getDeck(4)).then(() => {
      expect(store.getActions()[0].type).toEqual(fetchDeckRequest().type);
      expect(store.getActions()[1].type).toEqual(fetchDeckFailure("Something went wrong").type);
    });
  });
});

const getShuffledDeckResponse = {
  remaining: 12,
  deck_id: "o53iip4puik8",
  cards: [
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
      code: "6D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/6D.svg",
        png: "https://deckofcardsapi.com/static/img/6D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/6D.png"
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
      value: "ACE",
      code: "AH",
      images: {
        svg: "https://deckofcardsapi.com/static/img/AH.svg",
        png: "https://deckofcardsapi.com/static/img/AH.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/AH.png"
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
      value: "2",
      code: "2S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/2S.svg",
        png: "https://deckofcardsapi.com/static/img/2S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/2S.png"
    },
    {
      value: "4",
      code: "4H",
      images: {
        svg: "https://deckofcardsapi.com/static/img/4H.svg",
        png: "https://deckofcardsapi.com/static/img/4H.png"
      },
      suit: "HEARTS",
      image: "https://deckofcardsapi.com/static/img/4H.png"
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
      value: "7",
      code: "7C",
      images: {
        svg: "https://deckofcardsapi.com/static/img/7C.svg",
        png: "https://deckofcardsapi.com/static/img/7C.png"
      },
      suit: "CLUBS",
      image: "https://deckofcardsapi.com/static/img/7C.png"
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
      code: "AS",
      images: {
        svg: "https://deckofcardsapi.com/static/img/AS.svg",
        png: "https://deckofcardsapi.com/static/img/AS.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/AS.png"
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
      code: "0D",
      images: {
        svg: "https://deckofcardsapi.com/static/img/0D.svg",
        png: "https://deckofcardsapi.com/static/img/0D.png"
      },
      suit: "DIAMONDS",
      image: "https://deckofcardsapi.com/static/img/0D.png"
    },
    {
      value: "QUEEN",
      code: "QS",
      images: {
        svg: "https://deckofcardsapi.com/static/img/QS.svg",
        png: "https://deckofcardsapi.com/static/img/QS.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/QS.png"
    },
    {
      value: "9",
      code: "9S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/9S.svg",
        png: "https://deckofcardsapi.com/static/img/9S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/9S.png"
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
    }
  ],
  success: true
};
