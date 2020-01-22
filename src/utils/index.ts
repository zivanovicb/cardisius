import { CARDS_PER_HAND } from "../constants";
import { IPlayers, ICard, ICardFromAPI } from "../types";

export const getCardValue = (val: string): number => {
  switch (val) {
    case "KING":
      return 14;
    case "QUEEN":
      return 13;
    case "JACK":
      return 12;
    case "ACE":
      return 1;
    default:
      return parseInt(val, 10);
  }
};

export const dealCards = (players: IPlayers, cards: Array<ICardFromAPI>) => {
  const playersWithCards = Object.keys(players).reduce((acc, playerName) => {
    const handCards: Array<ICard> = [];

    for (let i = 0; i < CARDS_PER_HAND; i++) {
      // Removing dealt cards from deck
      const card = cards.shift();
      if (card !== undefined) handCards.push({ ...card, value: getCardValue(card.value) });
    }

    return {
      ...acc,
      [playerName]: {
        ...players[playerName],
        handCards
      }
    };
  }, {});

  return {
    // In case there are more cards then needed for one set of rounds leftovers will be returned
    cards: cards.map(c => ({ ...c, value: getCardValue(c.value) })),
    playersWithCards
  };
};

export const rnd = (min: number, max: number): number => Math.round(Math.random() * (max - min) + min);
