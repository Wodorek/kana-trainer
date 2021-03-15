import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setHeading, setMessage, displayModal } from '../Modal/modalSlice';
import { setTotalQuestions, completeQuestion } from '../QuizScreen/quizSlice';
import { dictionary } from '../../common/dictionary';
import Question from './Question';
import styled from 'styled-components';
import shuffle from 'lodash.shuffle';
import ProgressBar from './ProgressBar';
import StatsBox from '../StatsBox/StatsBox';

const StyledContainer = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
  align-items: center;
  align-content: center;
  gap: 1rem;
`;

const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);

  const history = useHistory();

  const dispatch = useDispatch();

  const questionsCompleted = useSelector(
    (state) => state.quiz.questionsCompleted
  );

  const selectedGroups = useSelector((state) => state.selection.selectedGroups);

  const questionsTotal = useSelector((state) => state.quiz.questionsTotal);

  const quizOn = useSelector((state) => state.selection.quizOn);

  //I hate how this is done, that whole function is a travesty
  //find out how to change it later
  //I should redo the whole dictionary structure...

  //take this out into reducer?
  const setUpQuestions = useCallback(() => {
    let charactersArrays = [];
    let spread = [];

    Object.keys(dictionary).forEach((key) => {
      Object.keys(dictionary[key]).forEach((el) => {
        if (selectedGroups.includes(el)) {
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
  }, [selectedGroups]);

  //assigns index AFTER shuffle, for focusing
  const setQuestionsIndex = useCallback(
    (arr) => {
      //doubles as a total questions number
      let itemIndex = 0;

      const withAssignedIndex = arr.map((question) => {
        itemIndex++;
        return { ...question, index: itemIndex };
      });
      dispatch(setTotalQuestions(itemIndex));
      return withAssignedIndex;
    },
    [dispatch]
  );

  const questionCompleteHandler = () => {
    dispatch(completeQuestion());
  };

  const redirect = useCallback(() => {
    dispatch(setHeading('No questions selected!'));
    dispatch(
      setMessage(
        'No groups were selected for the quiz. Please select some kana groups by clicking on the cards, and press start to begin'
      )
    );
    dispatch(displayModal());
    history.push('/');
  }, [dispatch, history]);

  useEffect(() => {
    if (!quizOn) {
      redirect();
    }

    let questions = setUpQuestions();
    questions = shuffle(questions);
    questions = setQuestionsIndex(questions);
    setQuestions(questions);
  }, [quizOn, redirect, setQuestionsIndex, setUpQuestions]);

  useEffect(() => {
    if (questionsTotal > 0 && questionsCompleted === questionsTotal) {
      history.push('/score');
    }
  }, [questionsCompleted, history, questionsTotal]);

  return (
    <>
      <ProgressBar current={questionsCompleted} total={questionsTotal} />
      <StatsBox />
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
    </>
  );
};

export default QuizScreen;
