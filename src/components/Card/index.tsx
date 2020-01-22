import React from "react";
import styled from "styled-components";
import CardBackImg from "../../img/card_back_bg.png";
import { ICard, ITableCard } from "../../types";

interface ICardHumanProps {
  type: "human";
  shouldMakeAMove: boolean;
  card: ICard;
  index: number;
  makeMove: (o: ITableCard) => void;
}

const Card: React.FC<ICardHumanProps | { type: "bot" }> = ({ type, ...rest }) => {
  if (type === "human") {
    return <CardHuman {...(rest as ICardHumanProps)} />;
  }
  return <CardImage src={CardBackImg} showCursorOnHover={false} data-testid="bot-card-view" />;
};

const CardHuman: React.FC<ICardHumanProps> = ({ makeMove, index, shouldMakeAMove, card }) => {
  return (
    <CardImage
      onClick={
        !shouldMakeAMove ? undefined : () => makeMove({ code: card.code, img: card.images.png, value: card.value })
      }
      src={card.images.png}
      alt={card.value.toString()}
      showCursorOnHover={shouldMakeAMove}
      data-testid={`human-card-view-${index}`}
    />
  );
};

const CardImage = styled.img<{ showCursorOnHover: boolean }>`
  width: 50px;
  height: 80px;
  margin-right: -10px;
  @media screen and (max-width: 430px) {
    width: 40px;
    height: 70px;
  }
  ${props =>
    props.showCursorOnHover &&
    `
    &:hover{
      cursor: pointer;
    }
  `}
`;

export default Card;
