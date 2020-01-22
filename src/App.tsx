import React from "react";
import { connect } from "react-redux";
import { ConnectedProps } from "react-redux";
import styled from "styled-components";
import Menu from "./components/Menu";
import Game from "./components/Game";
import { IState } from "./types";
import { getDeck, makeMove, setNumOfPlayers, endRound, endGame, playAgain } from "./actions";
import "./App.css";

const connector = connect((state: IState) => state, {
  getDeck,
  setNumOfPlayers,
  makeMove,
  endRound,
  endGame,
  playAgain
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export const App: React.FC<PropsFromRedux> = ({
  numOfPlayers,
  setNumOfPlayers,
  deckID,
  isLoading,
  err,
  players,
  roundMoves,
  deck,
  round,
  inactiveCards,
  winners,
  getDeck,
  makeMove,
  endRound,
  endGame,
  playAgain
}) => {
  return (
    <Wrapper className="App">
      {numOfPlayers === undefined ? (
        <Menu maxNumOfPlayers={4} setNumOfPlayers={setNumOfPlayers} />
      ) : (
        <Game
          numOfPlayers={numOfPlayers}
          isLoading={isLoading}
          err={err}
          players={players}
          round={round}
          deckID={deckID}
          deck={deck}
          roundMoves={roundMoves}
          inactiveCards={inactiveCards}
          winners={winners}
          getDeck={getDeck}
          makeMove={makeMove}
          endRound={endRound}
          endGame={endGame}
          playAgain={playAgain}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export default connector(App);
