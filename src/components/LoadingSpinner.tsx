import { HTMLAttributes } from "react";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";

type LoadingSpinnerProps = HTMLAttributes<HTMLDivElement>;

const LoadingSpinner: React.FunctionComponent<LoadingSpinnerProps> = ({
  ...props
}) => {
  return (
    <StyledContainer {...props}>
      <Oval
        height="70"
        width="70"
        color="#4327F5"
        secondaryColor="#3C1FF2"
        strokeWidth={5}
      />
    </StyledContainer>
  );
};

export default LoadingSpinner;

const StyledContainer = styled.div<{ embeded?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;
