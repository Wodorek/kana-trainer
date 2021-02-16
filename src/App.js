import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { StoreProvider } from './shared/context/store';
import SelectionScreen from './Pages/SelectionScreen';
import Quiz from './Pages/Quiz';
import Score from './Pages/Score';
import theme from './Themes/theme';

const App = () => {
  //Set up context to check if user picked kana groups for quiz
  //to prevent just typing URL instead clicking the button

  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/quiz" component={Quiz} />
            <Route path="/score" component={Score} />
            <Route path="/" component={SelectionScreen} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
