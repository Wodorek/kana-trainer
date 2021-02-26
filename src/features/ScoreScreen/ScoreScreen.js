import React from 'react';
import styled from 'styled-components';

import RedirectingScreen from '../RedirectingScreen/RedirectingScreen';
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
`;

const StyledScoreMessage = styled.p`
  font-size: 4rem;
`;

const Score = (props) => {
  const history = useHistory();

  const { questionsTotal, questionsCorrect, onReset } = props;

  console.log(questionsTotal, questionsCorrect);

  const calculatePercentage = () => {
    const denominator = questionsTotal;
    const numerator = questionsCorrect;

    const percentage = (numerator / denominator) * 100;

    return +percentage.toFixed(1);
  };

  const finishQuizHandler = () => {
    onReset();
    history.push('/');
  };

  let content;

  if (questionsTotal > 0) {
    content = (
      <StyledScorePage>
        <StyledScoreMessage>{`You got ${calculatePercentage()} % (${questionsCorrect} out of ${questionsTotal}) correct!`}</StyledScoreMessage>
        <Button onClick={finishQuizHandler}>Go again</Button>
      </StyledScorePage>
    );
  } else {
    content = (
      // <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <RedirectingScreen redirectTime={3}>
        No score to show! Select some groups, and press start to take the quiz
      </RedirectingScreen>
    );
  }

  return content;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Score);
