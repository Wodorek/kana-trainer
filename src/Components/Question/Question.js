import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from '../../shared/context/store';

const StyledQuestion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  height: 15rem;
  width: 11rem;
  font-size: 3rem;
  border-radius: 0.7rem;
  color: white;

  background-color: ${(props) => {
    if (props.correct === null) {
      return props.theme.blue.colors.primary;
    }
    if (props.correct === true) {
      return props.theme.blue.colors.correct;
    } else {
      return props.theme.blue.colors.incorrect;
    }
  }};
`;

const StyledCardText = styled.p`
  margin-top: 0.5rem;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  width: inherit;
  cursor: default;
  ::selection {
    text-decoration: none;
  }
`;

const StyledInput = styled.input`
  text-align: center;
  border-radius: 0.3rem;
  margin-bottom: 1.5rem;
  border: none;
  display: flex;
  justify-self: center;
  width: 7.5rem;
  height: 3.5rem;
  :focus {
    outline: none;
  }
`;

const Question = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('');
  const [correct, setCorrect] = useState(null);

  const { dispatch } = useStore();

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const getNextQuestion = (index) => {
    //end on last
    const nextQuestion = document.getElementById(index + 1);

    if (nextQuestion && nextQuestion.disabled) {
      return getNextQuestion(index + 1);
    }
    if (nextQuestion === null) {
      return getNextQuestion(0);
    }

    return nextQuestion;
  };

  const focusNextInput = () => {
    //todo focus on the first active item
    //all items done? call finishQuiz()

    //todo this should be handled with refs later
    const nextQuestion = getNextQuestion(props.index);

    if (nextQuestion === null) {
      finishQuiz();
    } else {
      nextQuestion.focus();
    }
  };

  const finishQuiz = () => {
    console.log('ssss');
  };

  //todo, do something to not call it twice on enter
  //(if blur ... else ...)
  const validateQuestionHandler = (event) => {
    event.preventDefault();
    if (value) {
      if (props.answers.includes(value)) {
        dispatch({ type: 'questionCorrect' });
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setDisabled(true);

      props.completeQuestion();
      focusNextInput();
    }
  };

  return (
    <StyledQuestion correct={correct}>
      <StyledCardText>{props.name}</StyledCardText>
      <form
        onChange={changeHandler}
        onSubmit={(event) => validateQuestionHandler(event)}
        value={value}
      >
        <StyledInput
          autoComplete="off"
          id={props.index}
          maxLength="3"
          // onBlur={validateQuestionHandler}
          disabled={disabled ? 'disabled' : ''}
        ></StyledInput>
      </form>
    </StyledQuestion>
  );
};

export default Question;
