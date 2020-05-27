import { IQuestionData } from '../data/question-data.interface';
import { rootReducer } from './reducers/root.reducer';
import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export interface IQuestionsState {
  readonly loading: boolean;
  readonly unanswered: IQuestionData[];
  readonly postedResult?: IQuestionData | undefined;
}

export interface IAppState {
  readonly questions: IQuestionsState;
}

export const initialQuestionsState: IQuestionsState = {
  loading: false,
  unanswered: [],
};

export const configureStore = (): Store<IAppState> => {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
};
