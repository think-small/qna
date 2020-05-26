// eslint-disable-next-line
import React, { FC } from 'react';
import { IAnswerData } from '../../data/answer-data.interface';
import Answer from '../answer/answer.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray5 } from '../../styles/base.styles';

interface IProps {
  data: IAnswerData[];
}

const AnswerList: FC<IProps> = ({ data }) => {
  return (
    <ul
      css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0;
      `}
    >
      {data.map((answer) => {
        return (
          <li
            key={answer.answerId}
            css={css`
              border-top: 1px solid ${gray5};
              text-align: left;
            `}
          >
            <Answer data={answer} />
          </li>
        );
      })}
    </ul>
  );
};

export default AnswerList;
