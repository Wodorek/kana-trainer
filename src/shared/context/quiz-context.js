import React from 'react';

const QuizContext = React.createContext({
  quizOn: false,
  setQuiz: () => {},
  selectedGroups: [],
});

export default QuizContext;
