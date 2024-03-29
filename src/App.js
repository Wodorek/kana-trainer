import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SelectionScreen from './features/SelectionScreen/SelectionScreen';
import QuizScreen from './features/QuizScreen/QuizScreen';
import ScoreScreen from './features/ScoreScreen/ScoreScreen';
import theme from './common/Themes/theme';
import ScrollToTop from './common/Util/ScrollToTop';

const App = () => {
  //Set up context to check if user picked kana groups for quiz
  //to prevent just typing URL instead clicking the button

  console.log(window.history);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path="/quiz" component={QuizScreen} />
          <Route path="/score" component={ScoreScreen} />
          <Route path="/" component={SelectionScreen} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
