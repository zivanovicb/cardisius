import React from "react";
import { render } from "@testing-library/react";
import PlayerBox from "../PlayerBox";
import { PLAYER_TWO_NAME } from "../../constants";

jest.useFakeTimers()

describe("<PlayerBox/>", () => {
  it("should render human PlayerBox", () => {
    const fn = jest.fn();
    const card = {
      value: 14,
      images: {
        svg: "img",
        png: "img"
      },
      image: "img",
      suit: "__",
      code: "9c"
    };
    const handCards = [card, card, card];

    const { queryAllByTestId, queryByTestId, getByTestId } = render(
      <PlayerBox
        index={0}
        isHuman={true}
        playerName="Human"
        shouldMakeAMove={true}
        makeMove={fn}
        sumOfCardValues={50}
        handCards={handCards}
      />
    );

    expect(queryByTestId("playerbox-0")).not.toBe(null);
    expect(getByTestId("hand-counter").textContent).toBe("Hand: 3");
    expect(getByTestId("sum-counter").textContent).toBe("Sum: 50");
    expect(getByTestId("player-name").textContent).toBe("Human");
    expect(queryAllByTestId(/human-card-view/).length).toBe(3);
  });

  it("should make a random move when not human", () => {
    const makeMoveFn = jest.fn();
    const card = {
      value: 14,
      images: {
        svg: "img",
        png: "img"
      },
      image: "img",
      suit: "__",
      code: "9c"
    };
    const handCards = [card, card, card];
    const { rerender } = render(
      <PlayerBox
        index={0}
        isHuman={false}
        playerName={PLAYER_TWO_NAME}
        shouldMakeAMove={false}
        makeMove={makeMoveFn}
        sumOfCardValues={50}
        handCards={handCards}
      />
    );

    rerender(
      <PlayerBox
        index={0}
        isHuman={false}
        playerName={PLAYER_TWO_NAME}
        shouldMakeAMove={true}
        makeMove={makeMoveFn}
        sumOfCardValues={50}
        handCards={handCards}
      />
    );
    jest.runAllTimers();

    expect(makeMoveFn).toHaveBeenCalledTimes(1);
  });
});
