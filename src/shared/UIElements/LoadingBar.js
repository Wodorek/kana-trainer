import React from 'react';
import styled, { keyframes } from 'styled-components';

const load = keyframes`
0% { width: 20%; }
  100% { width: 100%; }
}
`;

const StyledLoadingContainer = styled.div`
  background: white;
  border: 2px solid ${(props) => props.theme.blue.colors.primary};
  justify-content: flex-start;
  border-radius: 2rem;
  align-items: center;
  position: relative;
  padding: 0 0.5rem;
  display: flex;
  height: 2.5rem;
  width: 45rem;
`;

const StyledLoadingBar = styled.div`
  display: flex;
  align-content: center;
  animation: ${load} normal forwards;
  animation-duration: ${(props) => props.redirectTime}s;
  animation-timing-function: linear;
  border-radius: 2rem;
  background: ${(props) => props.theme.blue.colors.primary};
  height: 1.5rem;
  width: 20;
`;
const StyledLoadingText = styled.p`
  margin-left: 1rem;
  align-self: center;
  display: flex;
  color: white;
`;

const LoadingBar = (props) => {
  return (
    <StyledLoadingContainer>
      <StyledLoadingBar redirectTime={props.redirectTime}>
        <StyledLoadingText>Redirecting...</StyledLoadingText>
      </StyledLoadingBar>
    </StyledLoadingContainer>
  );
};

export default LoadingBar;
