import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Icon from "../Icon";
import { IPlayer } from "../../types";

interface IProps {
  winners: Array<IPlayer>;
  playAgain: () => void;
}

const GameOver: React.FC<IProps> = ({ winners, playAgain }) => {
  return (
    <Wrapper data-testid="game-over-overlay">
      <Winner>{getWinningMessage(winners)}</Winner>
      <StyledTrophyIcon name="trophy" width="116px" height="116px" />
      <Button data-testid="bt-play-again" type="menu" onClick={() => playAgain()}>
        Play again
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledTrophyIcon = styled(Icon)`
  margin-bottom: 30px;
`;

const Heading = styled.p`
  font-family: "Pacifico", cursive;
  font-size: 1rem;
  color: yellow;
`;

const Winner = styled(Heading)`
  font-size: 1.5rem;
  margin-bottom: 30px;
`;

const getWinningMessage = (winners: Array<IPlayer>) => {
  let str = "";
  if (winners.length === 1) return `${winners[0].name} won!`;

  for (let i = 0; i < winners.length; i++) {
    if (i === 0) {
      str += `${winners[i].name}`;
    } else if (i !== winners.length - 1) {
      str += `, ${winners[i].name}`;
    } else {
      str += ` & ${winners[i].name} are winners!`;
    }
  }
  return str;
};

export default GameOver;
