// eslint-disable-next-line
import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QuestionList from '../../components/question-list/question-list.component';
import { searchQuestions } from '../../data/data';
import { IQuestionData } from '../../data/question-data.interface';
import Layout from '../page-layout/page-layout.page';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const SearchPage: FC = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState<IQuestionData[]>([]);

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      setQuestions(() => foundResults);
    };
    doSearch(search);
  }, [search]);

  return (
    <Layout title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Layout>
  );
};

export default SearchPage;
