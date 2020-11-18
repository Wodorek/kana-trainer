import React, { useContext } from 'react';
import QuizContext from '../shared/context/quiz-context';

const Quiz = () => {
  const { quizOn, setQuizOn } = useContext(QuizContext);

  return (
    <div>
      <p>{`${quizOn}`}</p>
    </div>
  );
};

export default Quiz;
