//  eslint-disable-next-line
import React, { FC } from 'react';
import { IAnswerData } from '../../data/answer-data.interface';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray3 } from '../../styles/base.styles';

interface IProps {
  data: IAnswerData;
}

const Answer: FC<IProps> = ({ data }) => {
  return (
    <div
      css={css`
        padding: 10px 0px;
      `}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 13px;
        `}
      >
        {data.content}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-style: italic;
          color: ${gray3};
        `}
      >
        {`Answered by ${
          data.userName
        } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
      </div>
    </div>
  );
};

export default Answer;
