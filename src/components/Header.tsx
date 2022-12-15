import { useEffect, useCallback } from "react";
import styled from "styled-components";

import { ReactComponent as TesthyLogo } from "../assets/logo/testhy_logo.svg";
import { ReactComponent as InfoIcon } from "../assets/icons/info.svg";

import { useTrendingGifs } from "../hooks";
import Button from "./Button";

const Header: React.FunctionComponent = () => {
  const { refetchGifs } = useTrendingGifs();

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        refetchGifs();
      }
    },
    [refetchGifs]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <StyledHeader>
      <TesthyLogo />
      <StyledDiv>
        <StyledInfoIcon />
        <StyledText>
          Press <u>spacebar</u> to shuffle or
        </StyledText>
        <Button onClick={refetchGifs}>Click here</Button>
      </StyledDiv>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  height: 2.5rem;
  background-color: ${(p) => p.theme.grey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1.25rem 0rem 1.25rem;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
`;

const StyledText = styled.p`
  padding: 0rem 0.375rem 0rem 0.625rem;
  color: ${(p) => p.theme.lightGrey};
  font-size: 0.75rem;

  & > u {
    color: ${(p) => p.theme.white};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledInfoIcon = styled(InfoIcon)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: inline;
  align-items: center;
`;
