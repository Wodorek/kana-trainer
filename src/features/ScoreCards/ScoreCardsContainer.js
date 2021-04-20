import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GroupedCards from './GroupedCards';

const StContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const ScoreCardsContainer = () => {
  const answers = useSelector((state) => state.score.completedQuestions);

  return (
    <StContainer>
      {answers.map((el) => {
        return <GroupedCards key={el[0]} group={el[0]} answers={el[1]} />;
      })}
    </StContainer>
  );
};

export default ScoreCardsContainer;
