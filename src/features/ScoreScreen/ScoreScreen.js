import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import Button from '../../common/UIElements/Button';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

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
  font-size: 4rem;
  @media (max-width: 421px) {
    font-size: 3rem;
  }
`;

const StyledButtonGroup = styled.div`
  width: 70%;
  justify-content: space-around;
  display: flex;
  margin-top: 2rem;
  @media (max-width: 421px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Score = (props) => {
  const history = useHistory();

  const {
    questionsTotal,
    questionsCorrect,
    onReset,
    onSetHeading,
    onSetMessage,
    onModalShow,
    onRestart,
  } = props;

  const calculatePercentage = useCallback(() => {
    const denominator = questionsTotal;
    const numerator = questionsCorrect;

    const percentage = (numerator / denominator) * 100;

    return +percentage.toFixed(1);
  }, [questionsCorrect, questionsTotal]);

  const resetQuizHandler = () => {
    onReset();
    history.push('/');
  };

  const restartQuizHandler = () => {
    onRestart();
    history.push('/quiz');
  };

  useEffect(() => {
    if (isNaN(calculatePercentage())) {
      onSetHeading('No score to show!');
      onSetMessage(
        'There was no score to show. \nSelect some groups, complete the quiz, and you will see your score'
      );
      onModalShow();
      history.push('/');
    }
  }, [calculatePercentage, history, onModalShow, onSetHeading, onSetMessage]);

  return (
    <StyledScorePage>
      <StyledScoreMessage>{`You got ${calculatePercentage()} % (${questionsCorrect} out of ${questionsTotal}) correct!`}</StyledScoreMessage>
      <StyledButtonGroup>
        <Button onClick={restartQuizHandler}>Try again</Button>
        <Button onClick={resetQuizHandler}>Change groups</Button>
      </StyledButtonGroup>
    </StyledScorePage>
  );
};

const mapStateToProps = (state) => {
  return {
    questionsTotal: state.quiz.questionsTotal,
    questionsCorrect: state.quiz.questionsCorrect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReset: () => {
      return (
        dispatch({ type: 'selection/reset' }), dispatch({ type: 'quiz/reset' })
      );
    },
    onRestart: () => {
      dispatch({ type: 'quiz/restart' });
    },
    onSetHeading: (payload) => {
      dispatch({ type: 'modal/setHeading', payload: payload });
    },
    onSetMessage: (payload) => {
      dispatch({ type: 'modal/setMessage', payload: payload });
    },
    onModalShow: () => {
      dispatch({ type: 'modal/show' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Score);
