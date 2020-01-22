import React from "react";
import styled from "styled-components";

interface IStyledComponentProps {
  className?: string;
  children: any;
  onClick: () => void;
}
interface IProps extends IStyledComponentProps {
  type: "menu" | string;
}

const Button: React.FC<IProps> = ({ type, children, className, onClick, ...rest }: any) => {
  if (type === "menu") {
    return (
      <MenuButton data-testid="btn-menu" className={className} onClick={onClick} {...rest}>
        {children}
      </MenuButton>
    );
  }

  return (
    <Base data-testid="btn-base" className={className} onClick={onClick}>
      {children}
    </Base>
  );
};

const Base = styled.button`
  padding: 15px 20px;
  border-radius: 4px;
  font-size: 0.8rem;
  &:hover {
    cursor: pointer;
  }
`;

const MenuButton = styled(Base)`
  background: #fff2e0;
  margin-bottom: 15px;
  &:hover {
    background: #e8d8cc;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default Button;
