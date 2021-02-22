import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { useStore } from '../shared/context/store';
import { dictionary } from '../InternalData/dictionary';
import Question from '../Components/Question/Question';
import styled from 'styled-components';
import shuffle from 'lodash.shuffle';
import RedirectingScreen from '../shared/UIElements/RedirectingScreen';

const StyledContainer = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
  align-items: center;
  align-content: center;
  gap: 1rem;
`;

const Quiz = () => {
  const { state, dispatch } = useStore();

  const [questions, setQuestions] = useState([]);

  const [completedQuestions, setCompletedQuestions] = useState(0);

  const history = useHistory();

  // const cardRef = useRef(null);

  // console.log(dictionary);

  //I hate how this is done, that whole function is a travesty
  //find out how to change it later
  //I should redo the whole dictionary structure...
  const setUpQuestions = useCallback(() => {
    let charactersArrays = [];
    let spread = [];

    Object.keys(dictionary).forEach((key) => {
      Object.keys(dictionary[key]).forEach((el) => {
        if (state.selectedGroups.includes(el)) {
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
  }, [state.selectedGroups]);

  //assigns index AFTER shuffle, for focusing
  const setQuestionsIndex = useCallback(
    (arr) => {
      let itemIndex = 0;
      const withAssignedIndex = arr.map((question) => {
        itemIndex++;
        return { ...question, index: itemIndex };
      });
      dispatch({ type: 'setTotalQuestions', payload: itemIndex });
      return withAssignedIndex;
    },
    [dispatch]
  );

  const questionCompleteHandler = () => {
    setCompletedQuestions((prev) => completedQuestions + 1);
  };

  useEffect(() => {
    let questions = setUpQuestions();
    questions = shuffle(questions);
    questions = setQuestionsIndex(questions);

    setQuestions(questions);
  }, [setQuestionsIndex, setUpQuestions, state.selectedGroups]);

  console.log(state.questionsCorrect);

  let content;

  if (state.totalQuestions === completedQuestions && state.totalQuestions > 0) {
    content = <Redirect to="score" />;
  } else if (state.quizOn && state.selectedGroups.length > 0 && questions) {
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
      <RedirectingScreen
        message={'Please select some groups and press start!'}
        redirectTime={3}
        redirectTo={'/'}
      ></RedirectingScreen>
    );
  }

  return content;
};

export default Quiz;
