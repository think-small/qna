import { Action } from 'redux';
import { actionTypes } from './types.actions';
import { IQuestionData } from '../../data/question-data.interface';

export interface IGettingUnansweredQuestionsAction
  extends Action<actionTypes.GETTING_UNANSWERED_QUESTIONS> {}

export interface IGotUnansweredQuestionsAction
  extends Action<actionTypes.GOT_UNANSWERED_QUESTIONS> {
  questions: IQuestionData[];
}

export interface IPostedQuestionAction
  extends Action<actionTypes.POSTED_QUESTION> {
  result: IQuestionData | undefined;
}

export type QuestionsActions =
  | IGettingUnansweredQuestionsAction
  | IGotUnansweredQuestionsAction
  | IPostedQuestionAction;
