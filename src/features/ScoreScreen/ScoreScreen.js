import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { calculatePercentage } from '../../common/Util/calculatePercentage';
import { setHeading, setMessage, displayModal } from '../Modal/modalSlice';
import { restart } from '../QuizScreen/quizSlice';
import { reset } from '../SelectionScreen/selectionSlice';
import Button from '../../common/UIElements/Button';
import { resetScore } from './scoreSlice';
import ScoreCardsContainer from '../ScoreCards/ScoreCardsContainer';

const StyledScorePage = styled.div`
  gap: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  @media (max-width: 421px) {
    padding: 1rem;
  }
`;

const StyledScoreMessage = styled.p`
  margin-top: 1rem;
  font-size: 2rem;
  @media (max-width: 421px) {
    font-size: 1.5rem;
  }
`;

const StyledButtonGroup = styled.div`
  width: 70%;
  justify-content: space-around;
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 421px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Score = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const questionsTotal = useSelector((state) => state.quiz.questionsTotal);

  const questionsCorrect = useSelector((state) => state.quiz.questionsCorrect);

  const percentage = calculatePercentage(questionsTotal, questionsCorrect);

  const resetQuizHandler = () => {
    dispatch(reset());
    dispatch(restart());
    dispatch(resetScore());
    history.push('/');
  };

  const restartQuizHandler = () => {
    dispatch(restart());
    dispatch(resetScore());
    history.push('/quiz');
  };

  useEffect(() => {
    if (isNaN(calculatePercentage(questionsTotal, questionsCorrect))) {
      dispatch(setHeading('No score to show!'));
      dispatch(
        setMessage(
          'There was no score to show. \nSelect some groups, complete the quiz, and you will see your score'
        )
      );
      dispatch(displayModal());

      history.push('/');
    }
  }, [dispatch, history, questionsCorrect, questionsTotal]);

  return (
    <StyledScorePage>
      <StyledScoreMessage>{`You got ${percentage} % (${questionsCorrect} out of ${questionsTotal}) correct! Here are the details:`}</StyledScoreMessage>
      <ScoreCardsContainer />
      <StyledButtonGroup>
        <Button onClick={restartQuizHandler}>Try again</Button>
        <Button onClick={resetQuizHandler}>Change groups</Button>
      </StyledButtonGroup>
    </StyledScorePage>
  );
};

export default Score;
