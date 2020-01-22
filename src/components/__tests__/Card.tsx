import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "../Card";

describe("<Card/>", () => {
  it("should render bot card", () => {
    const { getByTestId } = render(<Card type="bot" />);
    expect(getByTestId("bot-card-view")).not.toBe(null);
  });

  it("should render human card", () => {
    const makeMoveFn = jest.fn();
    const card = {
      value: 5,
      code: "5S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/5S.svg",
        png: "https://deckofcardsapi.com/static/img/5S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/5S.png"
    };
    const { getByTestId } = render(
      <Card type="human" shouldMakeAMove={true} makeMove={makeMoveFn} index={0} card={card} />
    );
    expect(getByTestId("human-card-view-0")).not.toBe(null);
  });

  it("should makeMove when clicked on card", () => {
    const makeMoveFn = jest.fn();
    const card = {
      value: 5,
      code: "5S",
      images: {
        svg: "https://deckofcardsapi.com/static/img/5S.svg",
        png: "https://deckofcardsapi.com/static/img/5S.png"
      },
      suit: "SPADES",
      image: "https://deckofcardsapi.com/static/img/5S.png"
    };
    const { getByTestId } = render(
      <Card type="human" shouldMakeAMove={true} makeMove={makeMoveFn} index={0} card={card} />
    );
    fireEvent.click(getByTestId("human-card-view-0"));
    expect(makeMoveFn).toHaveBeenCalledTimes(1);
  });
});
