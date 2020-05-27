import { Reducer } from 'redux';
import { QuestionsActions } from '../actions/actions';
import { actionTypes } from '../actions/types.actions';
import { IQuestionsState } from '../store';

const initialQuestionsState: IQuestionsState = {
  loading: false,
  unanswered: [],
};

export const questionsReducer: Reducer<IQuestionsState, QuestionsActions> = (
  state = initialQuestionsState,
  action,
) => {
  switch (action.type) {
    case actionTypes.GETTING_UNANSWERED_QUESTIONS:
      return {
        ...state,
        unanswered: state.unanswered,
        loading: true,
      };
    case actionTypes.GOT_UNANSWERED_QUESTIONS:
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    case actionTypes.POSTED_QUESTION:
      return {
        ...state,
        unanswered: action.result
          ? [...state.unanswered, action.result]
          : state.unanswered,
        postedResult: action.result,
      };
    default:
      return state;
  }
};
