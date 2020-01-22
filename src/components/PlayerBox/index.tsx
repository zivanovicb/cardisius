import React from "react";
import styled from "styled-components";
import Card from "../Card";
import { ICard, ITableCard } from "../../types";
import { rnd } from "../../utils";

interface IProps {
  index: number;
  handCards: Array<ICard>;
  playerName: string;
  isHuman: boolean;
  shouldMakeAMove: boolean;
  sumOfCardValues: number;
  makeMove: (card: ITableCard) => void;
}

interface IState {
  makingAMove: boolean | undefined;
}

class PlayerBox extends React.Component<IProps, IState> {
  state = {
    makingAMove: false
  };

  moveTimeout: number | undefined;

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (!this.props.isHuman && this.props.shouldMakeAMove !== prevProps.shouldMakeAMove && this.props.shouldMakeAMove) {
      this.makeRandomMove();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.moveTimeout);
    this.moveTimeout = undefined;
  }

  makeRandomMove = () => {
    this.moveTimeout = setTimeout(() => {
      if (this.props.handCards.length) {
        const randomCard = this.props.handCards[rnd(0, this.props.handCards.length - 1)];
        this.props.makeMove({ code: randomCard.code, img: randomCard.images.png, value: randomCard.value });
      }
    }, 1000);
  };

  render() {
    const { index, sumOfCardValues, handCards, isHuman, shouldMakeAMove, makeMove, playerName, ...rest } = this.props;
    const nickName = playerName.split(" ")[1] ? playerName.split(" ")[1] : "Human";
    return (
      <Wrapper {...rest} data-testid={`playerbox-${index}`}>
        <PlayerName data-testid="player-name" shouldMakeAMove={shouldMakeAMove}>
          {playerName}
        </PlayerName>
        <PlayerNickName data-testid="player-nickname" shouldMakeAMove={shouldMakeAMove}>
          {nickName}
        </PlayerNickName>

        <HandCounter data-testid="hand-counter">Hand: {handCards.length}</HandCounter>
        <HandCounter data-testid="sum-counter">Sum: {sumOfCardValues}</HandCounter>

        <CardList isHuman={isHuman}>
          {handCards.map((c, i) => {
            if (isHuman) {
              return (
                <Card
                  key={i.toString()}
                  type="human"
                  card={c}
                  shouldMakeAMove={shouldMakeAMove}
                  makeMove={makeMove}
                  index={i}
                />
              );
            }
            return <Card key={i.toString()} type="bot" />;
          })}
        </CardList>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 400px;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

const PlayerDisplayName = styled.p<{ shouldMakeAMove: boolean }>`
  font-weight: bold;
  color: ${props => (props.shouldMakeAMove ? "yellow" : "white")};
`;

const PlayerName = styled(PlayerDisplayName)`
  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const PlayerNickName = styled(PlayerDisplayName)`
  display: none;
  @media screen and (max-width: 400px) {
    display: block;
  }
`;

const CardList = styled.div<{ isHuman: boolean }>`
  display: flex;
  ${props =>
    !props.isHuman &&
    `
  @media screen and (max-width: 1150px){
    display: none;
  }

  `}
`;

export const FirstPlayerBox = styled(PlayerBox)`
  position: absolute;
  bottom: 0;
  left: calc(50% - 200px);
  @media screen and (max-width: 400px) {
    left: 0;
  }
`;

export const SecondPlayerBox = styled(PlayerBox)`
  position: absolute;
  top: calc(50% - 58px);
  left: 0;
  align-items: flex-start;
`;

export const ThirdPlayerBox = styled(PlayerBox)`
  position: absolute;
  top: 0;
  left: calc(50% - 200px);
  @media screen and (max-width: 400px) {
    left: 0;
  }
`;

export const FourthPlayerBox = styled(PlayerBox)`
  position: absolute;
  right: 0;
  top: calc(50% - 58px);
  align-items: flex-end;
`;

const HandCounter = styled.p``;

export default PlayerBox;
