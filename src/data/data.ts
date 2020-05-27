import { IQuestionData } from './question-data.interface';
import { IAnswerData } from './answer-data.interface';

export const questions: IQuestionData[] = [
  {
    questionId: 1,
    title: 'Why should I learn TypeScript?',
    content:
      'TypeScript seems to be getting popular so I wondered whether it is worth my tie learning it? What benefits does it give over JavaScript?',
    userName: 'Bob',
    created: new Date(),
    answers: [
      {
        answerId: 1,
        content:
          'To catch problems earlier, speeding up your development process.',
        userName: 'Jane',
        created: new Date(),
      },
      {
        answerId: 2,
        content:
          'So that you can use the JavaScript features of tomorrow, today.',
        userName: 'Fred',
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: 'Which state management tool should I use?',
    content:
      'There seem to be a fair few state management tools around for React - React, Unstated, ...Which one should I use?',
    userName: 'Bob',
    created: new Date(),
    answers: [],
  },
];

export const getUnansweredQuestions = async (): Promise<IQuestionData[]> => {
  await wait(500);
  return questions.filter((question) => question.answers.length === 0);
};

export const getAnsweredQuestions = async (): Promise<IQuestionData[]> => {
  await 500;
  return questions.filter((q) => q.answers.length > 0);
};

export const getQuestion = async (
  questionId: number,
): Promise<IQuestionData | undefined> => {
  await wait(500);
  return questions.find((q) => q.questionId === questionId);
};

export const searchQuestions = async (
  criteria: string,
): Promise<IQuestionData[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLowerCase().includes(criteria.toLowerCase()) ||
      q.content.toLowerCase().includes(criteria.toLowerCase()),
  );
};

const wait = (ms: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, ms));
};

export interface IPostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}

export const postQuestion = async (
  question: IPostQuestionData,
): Promise<IQuestionData | undefined> => {
  await wait(500);
  const ids = questions.map((q) => q.questionId);
  const questionId = Math.max(...ids) + 1;
  const newQuestion: IQuestionData = {
    ...question,
    questionId,
    answers: [],
  };
  questions.push(newQuestion);
  return newQuestion;
};

export interface IPostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}

export const postAnswer = async (
  answer: IPostAnswerData,
): Promise<IAnswerData | undefined> => {
  await wait(500);
  const question = questions.filter(
    (q) => q.questionId === answer.questionId,
  )[0];
  const answerInQuestion: IAnswerData = {
    answerId: 99,
    ...answer,
  };
  question.answers.push(answerInQuestion);
  return answerInQuestion;
};
