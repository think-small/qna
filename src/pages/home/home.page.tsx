//  eslint-disable-next-line
import React, { FC, useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/primary-button/primary-button.component';
import QuestionList from '../../components/question-list/question-list.component';
import { Title } from '../../components/title/title.component';
import Layout from '../page-layout/page-layout.page';
import { useHistory } from 'react-router-dom';
import { IQuestionData } from '../../data/question-data.interface';
import { getAnsweredQuestions } from '../../data/data';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUnansweredQuestionsActionCreator } from '../../store/actions/creators.actions';
import { IAppState } from '../../store/store';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';

interface IProps {
  getUnansweredQuestions: () => Promise<void>;
  questions: IQuestionData[] | null;
  questionsLoading: boolean;
}

const HomePage: FC<IProps> = ({
  getUnansweredQuestions,
  questions,
  questionsLoading,
}) => {
  const history = useHistory();
  const [answeredQ, setAnsweredQ] = useState<IQuestionData[]>([]);

  useEffect(() => {
    if (questions && questions.length < 1) getUnansweredQuestions();
    const doGetAnsweredQuestions = async () => {
      const found = await getAnsweredQuestions();
      setAnsweredQ(found);
    };
    doGetAnsweredQuestions();
  }, [questions, getUnansweredQuestions]);

  const handleClick = () => {
    history.push('/ask');
  };

  return (
    <Layout>
      <section
        css={css`
          margin: 50px auto 20px auto;
          padding: 30px 20px;
          max-width: 600px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <Title>Unanswered Questions</Title>
          <PrimaryButton onClick={handleClick}>Ask a Question</PrimaryButton>
        </div>
        {!questions || questions.length < 0 ? <div>Loading...</div> : ''}
        {questions && questions.length > 0 ? (
          <QuestionList data={questions} />
        ) : (
          ''
        )}
      </section>
    </Layout>
  );
};

const mapStateToProps = (store: IAppState) => ({
  questions: store.questions.unanswered,
  questionsLoading: store.questions.loading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnansweredQuestions: () =>
      dispatch(getUnansweredQuestionsActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
