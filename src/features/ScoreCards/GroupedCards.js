import React from 'react';
import styled from 'styled-components';
import theme from '../../common/Themes/theme';
import ScoreCard from './ScoreCard';

const StContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  border: 2px solid ${(props) => theme.primary};
`;

const CardsContainer = styled.div`
  margin: 1rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StHeading = styled.h3`
  margin-top: 0.3rem;
`;

const GroupedCards = (props) => {
  const { answers, group } = props;

  let correctNum = 0;

  answers.forEach((el) => {
    if (el[1] === true) {
      correctNum++;
    }
  });

  const heading =
    group.charAt(group.length - 8) +
    ' group: ' +
    correctNum +
    '/' +
    answers.length;

  return (
    <StContainer>
      <StHeading>{heading}</StHeading>
      <CardsContainer>
        {answers.map((el) => {
          return <ScoreCard key={el[0]} name={el[0]} isCorrect={el[1]} />;
        })}
      </CardsContainer>
    </StContainer>
  );
};

export default GroupedCards;
