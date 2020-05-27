import {
  IGettingUnansweredQuestionsAction,
  IGotUnansweredQuestionsAction,
  IPostedQuestionAction,
} from './actions';
import { actionTypes } from './types.actions';
import {
  getUnansweredQuestions,
  postQuestion,
  IPostQuestionData,
} from '../../data/data';
import { IQuestionData } from '../../data/question-data.interface';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const getUnansweredQuestionsActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IQuestionData[],
  null,
  IGotUnansweredQuestionsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    //  Dispatch the GettingUnansweredQuestions action
    const gettingUnansweredQuestions: IGettingUnansweredQuestionsAction = {
      type: actionTypes.GETTING_UNANSWERED_QUESTIONS,
    };
    dispatch(gettingUnansweredQuestions);
    //  Get the questions from the server
    const questions = await getUnansweredQuestions();
    //  Dispatch the GotUnansweredQuestions action
    const gotUnansweredQuestionsAction: IGotUnansweredQuestionsAction = {
      type: actionTypes.GOT_UNANSWERED_QUESTIONS,
      questions: questions,
    };
    dispatch(gotUnansweredQuestionsAction);
  };
};

export const postQuestionActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IQuestionData,
  IPostQuestionData,
  IPostedQuestionAction
>> = (question: IPostQuestionData) => {
  return async (dispatch: Dispatch) => {
    const result = await postQuestion(question);
    const postedQuestionAction: IPostedQuestionAction = {
      type: actionTypes.POSTED_QUESTION,
      result,
    };
    dispatch(postedQuestionAction);
  };
};

export const clearPostedActionCreator: ActionCreator<IPostedQuestionAction> = () => {
  const postedQuestionAction: IPostedQuestionAction = {
    type: actionTypes.POSTED_QUESTION,
    result: undefined,
  };
  return postedQuestionAction;
};
