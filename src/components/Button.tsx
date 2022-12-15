import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  ...props
}) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: ${(p) => p.theme.white};
  font-weight: 500;
  font-size: 0.75rem;

  border-style: none;
  border-radius: 4px;

  padding: 0.5rem 0.938rem 0.5rem 0.938rem;
  background-color: ${(p) => p.theme.violet};

  &:hover {
    background-color: ${(p) => p.theme.darkViolet};
  }
`;
