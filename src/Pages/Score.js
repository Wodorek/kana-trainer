import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useStore } from '../shared/context/store';

const StyledScoreScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`;

const StyledScoreMessage = styled.p`
  font-size: 4rem;
`;

const StyledButton = styled.button`
  margin-top: 3rem;
`;

const Score = () => {
  const { state } = useStore();

  const history = useHistory();

  const { totalQuestions, questionsCorrect } = state;

  const calculatePercentage = () => {
    const denominator = totalQuestions;
    const numerator = questionsCorrect;

    const percentage = (numerator / denominator) * 100;

    return +percentage.toFixed(1);
  };

  let content;

  if (totalQuestions > 0) {
    content = (
      <StyledScoreScreen>
        <StyledScoreMessage>{`You got ${calculatePercentage()} % (${questionsCorrect} out of ${totalQuestions}) correct!`}</StyledScoreMessage>
        <StyledButton>Hello</StyledButton>
      </StyledScoreScreen>
    );
  } else {
    content = <p>s</p>;
    setTimeout(() => {
      history.goBack();
    }, 3000);
  }

  return content;
};

export default Score;
