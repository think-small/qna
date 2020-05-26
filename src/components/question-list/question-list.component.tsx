// eslint-disable-next-line
import React, { FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray5 } from '../../styles/base.styles';
import { IQuestionData } from '../../data/question-data.interface';
import Question from '../question/question.component';

interface Props {
  data: IQuestionData[];
  renderItem?: (item: IQuestionData) => JSX.Element;
}

const QuestionList: FC<Props> = ({ data, renderItem }) => {
  return (
    <ul
      css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0px 20px;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
      `}
    >
      {data.map((question) => (
        <li
          key={question.questionId}
          css={css`
            border-top: 1px solid ${gray5};
            :first-of-type {
              border-top: none;
            }
          `}
        >
          {renderItem ? renderItem(question) : <Question data={question} />}
        </li>
      ))}
    </ul>
  );
};

export default QuestionList;
