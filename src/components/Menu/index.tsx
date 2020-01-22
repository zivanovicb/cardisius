import React from "react";
import styled from "styled-components";
import Button from "../Button";

interface IProps {
  maxNumOfPlayers: number;
  setNumOfPlayers: (n: number) => void;
}

const Menu: React.FC<IProps> = ({ maxNumOfPlayers, setNumOfPlayers }) => {
  return (
    <Container data-testid="menu">
      <Heading>Select number of players</Heading>
      <Column>
        {[...Array(maxNumOfPlayers)].map((_, i) => {
          const n = i + 1;
          if (n >= 2) {
            return (
              <Button
                key={i.toString()}
                type="menu"
                onClick={() => {
                  setNumOfPlayers(n);
                }}
              >
                {n} players
              </Button>
            );
          }
          return null;
        })}
      </Column>
    </Container>
  );
};

const Container = styled.div`
  width: 800px;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 0 15px;
  }
`;

const Heading = styled.h3`
  font-family: "Pacifico", cursive;
  margin-bottom: 15px;
  color: yellow;
`;

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export default Menu;
