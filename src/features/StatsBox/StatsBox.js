import React from 'react';
import styled from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';
import { Check, Inbox, Satellite, ThumbsUp } from '@styled-icons/fa-solid';
import { useSelector } from 'react-redux';
import { calculatePercentage } from '../../common/Util/calculatePercentage';

const StyledContainer = styled.div`
  border-left: solid 1px white;
  border-bottom: solid 1px white;
  font-size: 100%;
  color: white;
  position: fixed;
  margin: 0;
  padding: 0;
  top: 6px;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  background-color: ${(props) => props.theme.primary};
  height: 2.5rem;
  width: 14rem;
  z-index: 2;
`;

const IconStyleWrapper = styled.div`
  ${StyledIconBase} {
    display: flex;
    align-items: center;
    color: white;
    height: 1rem;
    width: 1rem;
  }
`;

const StyledSectionWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StatsBox = () => {
  const questionsCorrect = useSelector((state) => state.quiz.questionsCorrect);
  const questionsTotal = useSelector((state) => state.quiz.questionsTotal);
  const questionsCompleted = useSelector(
    (state) => state.quiz.questionsCompleted
  );

  const percentage = calculatePercentage(questionsTotal, questionsCorrect);
  const questionsLeft = questionsTotal - questionsCompleted;

  return (
    <StyledContainer>
      <StyledSectionWrapper>
        <IconStyleWrapper>
          <ThumbsUp />
        </IconStyleWrapper>
        <span>{percentage ? percentage : '100'}%</span>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <IconStyleWrapper>
          <Check />
        </IconStyleWrapper>
        <span>{questionsCorrect}</span>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <IconStyleWrapper>
          <Inbox />
        </IconStyleWrapper>
        <span>{questionsLeft}</span>
      </StyledSectionWrapper>
    </StyledContainer>
  );
};

export default StatsBox;
