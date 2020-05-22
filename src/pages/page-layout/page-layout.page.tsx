// eslint-disable-next-line
import React, { FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Title } from '../../components/title/title.component';

interface IProps {
  title?: string;
}

const PageLayout: FC<IProps> = ({ title, children }) => (
  <div
    css={css`
      margin: 50px auto 20px auto;
      padding: 30px 20px;
      max-width: 600px;
    `}
  >
    {title && <Title>{title}</Title>}
    {children}
  </div>
);

export default PageLayout;
