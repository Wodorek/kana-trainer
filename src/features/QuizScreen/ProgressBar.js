import React from 'react';
import styled from 'styled-components';

const StyledProgressContainer = styled.div`
  display: ${(props) => (props.redirect ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: fixed;
  background-color: ${(props) => props.theme.primary};
  top: 0;
`;

const StyledProgress = styled.progress`
  border: none;
  border-radius: 0;

  display: block;
  color: black;
  background-color: ${(props) => props.theme.incorrect};

  width: 100%;
  height: 6px;
  ::-webkit-progress-bar {
    background-color: ${(props) => props.theme.incorrect};
  }
  ::-moz-progress-bar {
    background-color: ${(props) => props.theme.correct};
  }
  ::-webkit-progress-value {
    background-color: ${(props) => props.theme.correct};
  }
`;

const StyledLabel = styled.label`
  display: none;
  color: white;
`;

const ProgressBar = (props) => {
  const { current, total } = props;

  return (
    <StyledProgressContainer>
      <StyledLabel htmlFor="completedQuestions"></StyledLabel>
      <StyledProgress
        value={current}
        max={total}
        id="completedQuestions"
      ></StyledProgress>
    </StyledProgressContainer>
  );
};

export default ProgressBar;
