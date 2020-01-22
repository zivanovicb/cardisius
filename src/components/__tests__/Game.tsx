import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Game from "../Game";
import { ITableCard } from "../../types";
import { PLAYER_ONE_NAME, PLAYER_TWO_NAME, PLAYER_THREE_NAME } from "../../constants";

jest.useFakeTimers();

describe("<Game/>", () => {
  it("should render loader icon if isLoading is true", () => {
    const { getByTestId } = render(
      <Game
        isLoading={true}
        deckID="randomdeckid"
        numOfPlayers={4}
        err={null}
        getDeck={(numOfPlayers: number) => {}}
        makeMove={(playerName: string, card: ITableCard) => {}}
        endRound={() => {}}
        endGame={() => {}}
        playAgain={() => {}}
        round={1}
        deck={[]}
        winners={[]}
        inactiveCards={[]}
        players={{}}
        roundMoves={[]}
      />
    );

    expect(getByTestId("loader-icon")).not.toBe(null);
  });

  it("should render error message if err is not null and isLoading is false", () => {
    const { getByTestId } = render(
      <Game
        isLoading={false}
        err="Something went wrong!"
        deckID="randomdeckid"
        numOfPlayers={4}
        getDeck={(numOfPlayers: number) => {}}
        makeMove={(playerName: string, card: ITableCard) => {}}
        endRound={() => {}}
        endGame={() => {}}
        playAgain={() => {}}
        round={1}
        deck={[]}
        winners={[]}
        inactiveCards={[]}
        players={{}}
        roundMoves={[]}
      />
    );

    expect(getByTestId("err-message").textContent).toBe("We're sorry, something went wrong!");
  });

  it("should render gameover screen if we have winners", () => {
    const { getByTestId } = render(
      <Game
        isLoading={false}
        err={null}
        deckID="randomdeckid"
        numOfPlayers={4}
        getDeck={(numOfPlayers: number) => {}}
        makeMove={(playerName: string, card: ITableCard) => {}}
        endRound={() => {}}
        endGame={() => {}}
        playAgain={() => {}}
        round={1}
        deck={[]}
        winners={[
          {
            name: "Branko Zivanovic",
            handCards: [],
            wonCards: [],
            sumOfCardValues: 150
          }
        ]}
        inactiveCards={[]}
        players={{}}
        roundMoves={[]}
      />
    );

    expect(getByTestId("game-over-overlay")).not.toBe(null);
  });

  it("should render round counter", () => {
    const { getByTestId } = render(
      <Game
        isLoading={false}
        err={null}
        deckID="randomdeckid"
        numOfPlayers={4}
        getDeck={(numOfPlayers: number) => {}}
        makeMove={(playerName: string, card: ITableCard) => {}}
        endRound={() => {}}
        endGame={() => {}}
        playAgain={() => {}}
        round={5}
        deck={[]}
        winners={[
          {
            name: "Branko Zivanovic",
            handCards: [],
            wonCards: [],
            sumOfCardValues: 150
          }
        ]}
        inactiveCards={[]}
        players={{}}
        roundMoves={[]}
      />
    );

    expect(getByTestId("round-counter").textContent).toBe("Round: 5");
  });

  it("should endGame when round is incremented to 10", () => {
    const endGameFn = jest.fn();
    const { getByTestId, rerender } = render(
      <Game
        isLoading={false}
        err={null}
        deckID="randomdeckid"
        numOfPlayers={4}
        getDeck={(numOfPlayers: number) => {}}
        makeMove={(playerName: string, card: ITableCard) => {}}
        endRound={() => {}}
        endGame={() => {}}
        playAgain={() => {}}
        round={1}
        deck={[]}
        winners={[]}
        inactiveCards={[]}
        players={{}}
        roundMoves={[]}
      />
    );
    expect(getByTestId("round-counter").textContent).toBe("Round: 1");

    rerender(
      <Game
        isLoading={false}
        err={null}
        deckID="randomdeckid"
        numOfPlayers={4}
        getDeck={(numOfPlayers: number) => {}}
        makeMove={(playerName: string, card: ITableCard) => {}}
        endRound={() => {}}
        endGame={endGameFn}
        playAgain={() => {}}
        round={10}
        deck={[]}
        winners={[]}
        inactiveCards={[]}
        players={{}}
        roundMoves={[]}
      />
    );

    expect(endGameFn).toHaveBeenCalledTimes(1);
  });

  it("should endRound when all players have made their moves", async () => {
    const endRoundFn = jest.fn();

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

    const roundMoves = [
      {
        playerName: PLAYER_ONE_NAME,
        card: tableCard
      },
      {
        playerName: PLAYER_TWO_NAME,
        card: tableCardTwo
      }
    ];
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
      }
    };

    const { rerender } = render(
      <Game
        isLoading={false}
        err={null}
        deckID="randomdeckid"
        numOfPlayers={4}
        getDeck={(numOfPlayers: number) => {}}
        makeMove={(playerName: string, card: ITableCard) => {}}
        endRound={() => {}}
        endGame={() => {}}
        playAgain={() => {}}
        round={1}
        deck={[]}
        winners={[]}
        inactiveCards={[]}
        players={players}
        roundMoves={roundMoves}
      />
    );

    rerender(
      <Game
        isLoading={false}
        err={null}
        deckID="randomdeckid"
        numOfPlayers={4}
        getDeck={(numOfPlayers: number) => {}}
        makeMove={(playerName: string, card: ITableCard) => {}}
        endRound={endRoundFn}
        endGame={() => {}}
        playAgain={() => {}}
        round={1}
        deck={[]}
        winners={[]}
        inactiveCards={[]}
        players={players}
        roundMoves={[...roundMoves, { playerName: PLAYER_THREE_NAME, card: tableCardThree }]}
      />
    );

    jest.runAllTimers();
    expect(endRoundFn).toHaveBeenCalledTimes(1);
  });

  // it("should render list of <PlayerBox/>", () => {
  //   const numberOfPlayers = 4
  //   const { queryAllByTestId } = render(
  //       <Game
  //         isLoading={true}
  //         err={null}
  //         deckID="randomdeckid"
  //         numOfPlayers={numberOfPlayers}
  //         getDeck={(numOfPlayers: number) => {}}
  //         makeMove={(playerName: string, card: ITableCard) => {}}
  //         endRound={() => {}}
  //         endGame={() => {}}
  //         playAgain={() => {}}
  //         round={1}
  //         deck={[]}
  //         winners={[]}
  //         inactiveCards={[]}
  //         players={{}}
  //         roundMoves={[]}
  //       />
  //     );
  //   const playerBoxes = queryAllByTestId("playerbox-0")
  //   console.log(playerBoxes)
  // })
});
