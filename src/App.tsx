import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/home/home.page';
import AskPage from './pages/ask/ask.page';
import SearchPage from './pages/search/search.page';
import SigninPage from './pages/signin/signin.page';
import QuestionPage from './pages/question/question.page';
import NotFoundPage from './pages/not-found/not-found.page';
import Header from './components/header/header.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontFamily, fontSize, gray2 } from './styles/base.styles';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div
        className="App"
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
          text-align: center;
        `}
      >
        <Header />
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/ask" component={AskPage} />
          <Route path="/signin" component={SigninPage} />
          <Route path="/question/:questionId" component={QuestionPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
