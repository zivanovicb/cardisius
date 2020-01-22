import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GameOver from "../GameOver";

describe("<GameOver/>", () => {
  it("should call playAgain on when button play again is clicked", () => {
    const playAgainFn = jest.fn();
    const { getByTestId } = render(<GameOver winners={[]} playAgain={playAgainFn} />);
    fireEvent.click(getByTestId("bt-play-again"));
    expect(playAgainFn).toHaveBeenCalledTimes(1);
  });
});
