//  eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/primary-button/primary-button.component';
import QuestionList from '../../components/question-list/question-list.component';
import { Title } from '../../components/title/title.component';
import Layout from '../page-layout/page-layout.page';
import { getUnansweredQuestions } from '../../data/data';
import { IQuestionData } from '../../data/question-data.interface';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';

const HomePage = () => {
  const [questions, setQuestions] = useState<IQuestionData[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setLoadingQuestions(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const handleClick = () => {
    alert('Redirect to AskPage');
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
        {loadingQuestions ? (
          <div
            css={css`
              font-size: 16px;
              font-style: italic;
            `}
          >
            Loading...
          </div>
        ) : (
          <QuestionList data={questions} />
        )}
        {/* <QuestionList data={questions} /> */}
      </section>
    </Layout>
  );
};

export default HomePage;
