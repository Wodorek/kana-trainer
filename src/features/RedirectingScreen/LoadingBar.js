import React from 'react';
import styled, { keyframes } from 'styled-components';

const load = keyframes`
0% { width: 37% }
  100% { width: 100%; }
}
`;

const StyledLoadingContainer = styled.div`
  background: white;
  border: 2px solid ${(props) => props.theme.primary};
  justify-content: flex-start;
  border-radius: 0.5rem;
  align-items: center;
  position: relative;
  padding: 0 0.5rem;
  display: flex;
  height: 2.5rem;
  width: 45rem;
  @media (max-width: 420px) {
    width: 20rem;
  }
`;

const StyledLoadingBar = styled.div`
  display: flex;
  align-content: center;
  animation: ${load} normal forwards;
  animation-duration: ${(props) => props.redirectTime}s;
  animation-timing-function: linear;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.primary};
  height: 1.5rem;
  @media (max-width: 420px) {
    width: 20rem;
  }
`;
const StyledLoadingText = styled.p`
  margin-left: 1rem;
  color: white;
`;

const LoadingBar = (props) => {
  const { redirectTime } = props;

  return (
    <StyledLoadingContainer>
      <StyledLoadingBar redirectTime={redirectTime}>
        <StyledLoadingText>Redirecting...</StyledLoadingText>
      </StyledLoadingBar>
    </StyledLoadingContainer>
  );
};

export default LoadingBar;
