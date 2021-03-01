import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { dictionary } from '../../common/dictionary';
import Question from './Question';
import styled from 'styled-components';
import shuffle from 'lodash.shuffle';
import RedirectingScreen from '../RedirectingScreen/RedirectingScreen';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';

const StyledContainer = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
  align-items: center;
  align-content: center;
  gap: 1rem;
`;

const QuizScreen = (props) => {
  const [questions, setQuestions] = useState([]);

  const [completedQuestions, setCompletedQuestions] = useState(0);

  const { selectedGroups, questionsTotal, quizOn, onSetTotalQuestions } = props;

  //I hate how this is done, that whole function is a travesty
  //find out how to change it later
  //I should redo the whole dictionary structure...

  //take this out into reducer?
  const setUpQuestions = useCallback(() => {
    let charactersArrays = [];
    let spread = [];

    Object.keys(dictionary).forEach((key) => {
      Object.keys(dictionary[key]).forEach((el) => {
        if (props.selectedGroups.includes(el)) {
          charactersArrays = [
            ...charactersArrays,
            dictionary[key][el].characters,
          ];
        }
      });
    });

    Object.keys(charactersArrays).forEach((index) => {
      Object.keys(charactersArrays[index]).forEach((letter) => {
        spread.push({
          letter: letter,
          answers: charactersArrays[index][letter],
          index: 0,
        });
      });
    });

    return spread;
  }, [props.selectedGroups]);

  //assigns index AFTER shuffle, for focusing
  const setQuestionsIndex = useCallback(
    (arr) => {
      //doubles as a total questions number
      let itemIndex = 0;

      const withAssignedIndex = arr.map((question) => {
        itemIndex++;
        return { ...question, index: itemIndex };
      });
      onSetTotalQuestions(itemIndex);
      return withAssignedIndex;
    },
    [onSetTotalQuestions]
  );

  const questionCompleteHandler = () => {
    setCompletedQuestions((prev) => completedQuestions + 1);
  };

  useEffect(() => {
    let questions = setUpQuestions();
    questions = shuffle(questions);
    questions = setQuestionsIndex(questions);
    setQuestions(questions);
  }, [setQuestionsIndex, setUpQuestions, selectedGroups]);

  let content;

  if (questionsTotal === completedQuestions && questionsTotal > 0) {
    content = <Redirect to="/score" />;
  } else if (quizOn && selectedGroups.length > 0 && questions) {
    content = (
      <StyledContainer>
        {questions.map((question) => {
          return (
            <Question
              completeQuestion={questionCompleteHandler}
              index={question.index}
              key={question.letter}
              name={question.letter}
              answers={question.answers}
            />
          );
        })}
      </StyledContainer>
    );
  } else {
    content = (
      <RedirectingScreen redirectTime={3} redirectTo={'/'}>
        Please select some groups and press start!
      </RedirectingScreen>
    );
  }

  return (
    <>
      <ProgressBar current={completedQuestions} total={questionsTotal} />
      {content}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedGroups: state.selection.selectedGroups,
    questionsTotal: state.quiz.questionsTotal,
    quizOn: state.selection.quizOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetTotalQuestions: (payload) =>
      dispatch({ type: 'quiz/setTotalQuestions', payload: payload }),
    onSetUpQuestions: (payload) => dispatch({ type: 'quiz/setUpQuestions' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);
