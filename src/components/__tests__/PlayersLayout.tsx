import React from "react";
import { render } from "@testing-library/react";
import PlayersLayout from "../PlayersLayout";
import { PLAYER_ONE_NAME, PLAYER_TWO_NAME, PLAYER_THREE_NAME, PLAYER_FOUR_NAME } from "../../constants";

describe("<PlayersLayout/>", () => {
  it("should render list of PlayerBox components", () => {
    const emptyPlayerEntry = {
      handCards: [],
      wonCards: [],
      sumOfCardValues: 0
    };

    const players = {
      [PLAYER_ONE_NAME]: {
        name: PLAYER_ONE_NAME,
        ...emptyPlayerEntry
      },
      [PLAYER_TWO_NAME]: {
        name: PLAYER_TWO_NAME,
        ...emptyPlayerEntry
      },
      [PLAYER_THREE_NAME]: {
        name: PLAYER_THREE_NAME,
        ...emptyPlayerEntry
      },
      [PLAYER_FOUR_NAME]: {
        name: PLAYER_FOUR_NAME,
        ...emptyPlayerEntry
      }
    };
    const fn = jest.fn();

    const { queryAllByTestId } = render(<PlayersLayout roundMoves={[]} players={players} makeMove={fn} />);
    expect(queryAllByTestId(/playerbox/).length).toBe(4);
  });
});
