import { IAnswerData } from './answer-data.interface';

export interface IQuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: IAnswerData[];
}
