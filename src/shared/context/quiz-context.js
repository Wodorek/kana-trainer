import React from 'react';

const QuizContext = React.createContext({
  quizOn: false,
  setQuiz: () => {},
});

export default QuizContext;
