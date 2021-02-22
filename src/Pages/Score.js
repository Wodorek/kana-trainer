import React from 'react';
import styled from 'styled-components';
import { useStore } from '../shared/context/store';
import RedirectingScreen from '../shared/UIElements/RedirectingScreen';

const StyledScorePage = styled.div`
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
      <StyledScorePage>
        <StyledScoreMessage>{`You got ${calculatePercentage()} % (${questionsCorrect} out of ${totalQuestions}) correct!`}</StyledScoreMessage>
        <StyledButton>Hello</StyledButton>
      </StyledScorePage>
    );
  } else {
    content = (
      <RedirectingScreen
        redirectTime={3}
        RedirectTo={'/'}
        message={'No score to show! Select the groups, and take the quiz'}
      />
    );
  }

  return content;
};

export default Score;
