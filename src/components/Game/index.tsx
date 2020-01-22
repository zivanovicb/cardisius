import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import PlayersLayout from "../PlayersLayout";
import GameOverOverlay from "../GameOver";
import { IState, ITableCard } from "../../types";

interface IProps extends IState {
  getDeck: (numOfPlayers: number) => void;
  makeMove: (playerName: string, card: ITableCard) => void;
  endRound: () => void;
  endGame: () => void;
  playAgain: () => void;
}

class Game extends React.Component<IProps, {}> {
  endRoundTimeout: number | undefined;

  componentDidMount() {
    this.props.getDeck(this.props.numOfPlayers || 2);
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      this.props.roundMoves.length !== prevProps.roundMoves.length &&
      this.props.roundMoves.length === Object.keys(this.props.players).length
    ) {
      this.endRound();
    }

    if (this.props.round !== prevProps.round && this.props.round === 10) {
      this.props.endGame();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.endRoundTimeout);
    this.endRoundTimeout = undefined;
  }

  endRound = () => {
    this.endRoundTimeout = setTimeout(() => {
      this.props.endRound();
    }, 1000);
  };

  render() {
    const { isLoading, err, winners, round, players, roundMoves, makeMove, playAgain } = this.props;
    if (isLoading) {
      return <Icon name="loader" width="50px" height="80px" />;
    }
    if (err) {
      return <h1 data-testid="err-message">We're sorry, something went wrong!</h1>;
    }

    return (
      <Wrapper data-testid="game">
        <RoundCounter data-testid="round-counter">Round: {round}</RoundCounter>
        <TableCards>
          {roundMoves.map((m, i) => (
            <CardColumn key={i.toString()}>
              <Card src={m.card.img} alt={m.card.value.toString()} />
              <PlayerNickName>{i === 0 ? "Human" : m.playerName.split(" ")[1]}</PlayerNickName>
            </CardColumn>
          ))}
        </TableCards>
        <PlayersLayout makeMove={makeMove} players={players} roundMoves={roundMoves} />
        {winners.length > 0 && <GameOverOverlay winners={winners} playAgain={playAgain} />}
      </Wrapper>
    );
  }
}

const CardColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 20px;
  &:last-of-type {
    margin-right: 0;
  }
`;

const PlayerNickName = styled.p`
  font-size: 13px;
`;

const Heading = styled.p`
  font-family: "Pacifico", cursive;
  font-size: 1rem;
  color: yellow;
`;
const RoundCounter = styled(Heading)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Card = styled.img`
  width: 50px;
  height: 80px;
  margin-right: 2px;
  &:last-of-type {
    margin-right: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableCards = styled.div`
  display: flex;
  position: relative;
  top: 40px;
  @media screen and (max-width: 1150px) {
    top: 0;
  }
`;

export default Game;
