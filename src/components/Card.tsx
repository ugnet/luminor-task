import { HTMLAttributes, useState } from "react";
import styled, { keyframes } from "styled-components";

import { GifObject } from "../types/data";

import { ReactComponent as UnlockedIcon } from "../assets/icons/unlocked.svg";
import { ReactComponent as LockedIcon } from "../assets/icons/locked.svg";

type CardProps = {
  index: number;
  isLocked?: boolean;
  gifObject?: GifObject;
  lockGif: (index: number, gif: GifObject) => void;
  unlockGif: (index: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const Card: React.FunctionComponent<CardProps> = ({
  index,
  gifObject,
  lockGif,
  unlockGif,
  isLocked = false,
  ...props
}) => {
  const [locked, setLocked] = useState(isLocked);

  if (!gifObject) return null;

  const handleClick = () => {
    if (locked) {
      unlockGif(index);
    } else {
      lockGif(index, gifObject);
    }

    setLocked(!locked);
  };

  return (
    <CardContainer onClick={handleClick} {...props}>
      <Placeholder />
      <Border>
        <StyledImage src={gifObject.images.original.url} />
        {locked && <StyledLockedIcon id="styledLockedIcon" />}
        {locked ? (
          <StyledLabelContainer>
            <UnlockedIcon />
            Click to unlock
          </StyledLabelContainer>
        ) : (
          <StyledLabelContainer>
            <LockedIcon />
            Click to lock
          </StyledLabelContainer>
        )}
      </Border>
    </CardContainer>
  );
};

export default Card;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const breatheAnimation = keyframes`
 0% { opacity: 0.2 }
 50% { opacity: 0.7 ; }
 100% { opacity: 0.2; }
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  object-fit: cover;

  background-color: ${(p) => p.theme.lightGrey};
  animation-name: ${breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;

const CardContainer = styled.div`
  cursor: pointer;
  aspect-ratio: 67 / 52;
  position: relative;
  border: none;
  min-width: 1rem;

  &:hover {
    & > div > div {
      display: flex;
      align-items: center;
    }

    #styledLockedIcon {
      display: none;
    }
  }
`;

const Border = styled.div`
  position: absolute;
  inset: 0;

  &:hover {
    border: 4px solid;
    border-color: ${(p) => p.theme.violet};
  }
`;

const StyledLabelContainer = styled.div`
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;

  color: ${(p) => p.theme.white};
  font-size: 0.75rem;
  font-weight: 500;

  display: none;
`;

const StyledLockedIcon = styled(LockedIcon)`
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;

  &:hover {
    display: none;
  }
`;
