import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form, {
  Values,
  required,
  minLength,
} from '../../components/form/form.component';
import Field from '../../components/form/form-field/form-field.component';
import { getQuestion, postAnswer } from '../../data/data';
import { IQuestionData } from '../../data/question-data.interface';
import AnswerList from '../../components/answer-list/answer-list.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray3, gray6 } from '../../styles/base.styles';

interface RouteParams {
  questionId: string;
}

const QuestionPage: FC<RouteParams> = (props) => {
  const [question, setQuestion] = useState<IQuestionData | undefined>(
    undefined,
  );
  const { questionId } = useParams();

  useEffect(() => {
    const doGetQuestion = async (id: number) => {
      const foundQuestion = await getQuestion(id);
      setQuestion(() => foundQuestion);
    };
    if (questionId) {
      const id = Number(questionId);
      doGetQuestion(id);
    }
  }, [questionId]);

  const handleSubmit = async (values: Values) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { success: result ? true : false };
  };

  return (
    <div
      css={css`
        background-color: white;
        width: 40%;
        margin: 100px auto 0;
        padding: 10px 25px;
        border: 1px solid ${gray6};
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
      `}
    >
      <div
        css={css`
          font-size: 19px;
          font-weight: bold;
          margin: 10px 0px 5px;
          text-align: left;
        `}
      >
        {question ? question.title : ''}
      </div>
      {question && (
        <React.Fragment>
          <p
            css={css`
              margin-top: 0px;
              background-color: white;
              font-weight: normal;
              text-align: left;
            `}
          >
            {question.content}
          </p>
          <div
            css={css`
              font-size: 12px;
              font-style: italic;
              color: ${gray3};
              text-align: left;
            `}
          >
            {`Asked by ${
              question.userName
            } on ${question.created.toLocaleDateString()} ${question.created.toLocaleTimeString()}`}
          </div>
          <AnswerList data={question.answers} />
          <div>
            <Form
              submitCaption="Submit Your Answer"
              validationRules={{
                content: [
                  { validator: required },
                  { validator: minLength, args: 50 },
                ],
              }}
              onSubmit={handleSubmit}
              failureMessage="There was a problem with your answer"
              successMessage="Answer successfully submitted"
            >
              <Field name="content" label="Your Answer" type="TextArea" />
            </Form>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default QuestionPage;
