import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import QuizContext from './shared/context/quiz-context';
import SelectionScreen from './Pages/SelectionScreen';
import Quiz from './Pages/Quiz';
import Score from './Pages/Score';

const App = () => {
  //Set up context to check if user picked kana groups for quiz
  //to prevent just typing URL instead clicking the button

  const [quizOn, setQuizOn] = useState(false);
  const value = { quizOn, setQuizOn };

  return (
    <QuizContext.Provider value={value}>
      <BrowserRouter>
        <Switch>
          <Route path="/quiz" component={Quiz} />
          <Route path="/score" component={Score} />
          <Route path="/" component={SelectionScreen} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </QuizContext.Provider>
  );
};

export default App;
