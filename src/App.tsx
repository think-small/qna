import React from 'react';
import HomePage from './pages/home/home.page';
import Header from './components/header/header.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontFamily, fontSize, gray2 } from './styles/base.styles';

const App: React.FC = () => {
  return (
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
      <HomePage />
    </div>
  );
};

export default App;
