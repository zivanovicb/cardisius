import React from "react";
import { FirstPlayerBox, SecondPlayerBox, ThirdPlayerBox, FourthPlayerBox } from "../PlayerBox";

import { ITableCard, IPlayers, IMove } from "../../types";

interface IProps {
  roundMoves: Array<IMove>;
  players: IPlayers
  makeMove: (playerName: string, card: ITableCard) => void;
}

const PlayersLayout: React.FC<IProps> = ({ players, roundMoves, makeMove }) => {
  return (
    <>
      {Object.values(players).map((p, i) => {
        const layout = playerBoxLayouts[Object.keys(players).length.toString()];
        const StyledPlayerBox = layout.ui[i];

        return (
          <StyledPlayerBox
            index={i}
            key={i.toString()}
            shouldMakeAMove={i === roundMoves.length}
            isHuman={i === 0}
            playerName={p.name}
            handCards={p.handCards}
            makeMove={(card: ITableCard) => makeMove(p.name, card)}
            sumOfCardValues={p.sumOfCardValues}
          />
        );
      })}
    </>
  );
};

export default PlayersLayout;

const playerBoxLayouts: {
  [key: string]: {
    numOfPlayers: number;
    ui: any;
  };
} = {
  "2": {
    numOfPlayers: 2,
    ui: [FirstPlayerBox, ThirdPlayerBox]
  },
  "3": {
    numOfPlayers: 3,
    ui: [FirstPlayerBox, SecondPlayerBox, FourthPlayerBox]
  },
  "4": {
    numOfPlayers: 4,
    ui: [FirstPlayerBox, SecondPlayerBox, ThirdPlayerBox, FourthPlayerBox]
  }
};
