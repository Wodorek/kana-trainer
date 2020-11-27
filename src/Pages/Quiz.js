import React, { useContext } from 'react';
import QuizContext from '../shared/context/quiz-context';

const Quiz = () => {
  const { quizOn, selectedGroups } = useContext(QuizContext);

  return (
    <div>
      <p>{`${selectedGroups}`}</p>
    </div>
  );
};

export default Quiz;
