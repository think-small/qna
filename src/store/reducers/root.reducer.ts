import { combineReducers } from 'redux';
import { questionsReducer } from './questions.reducer';
import { IAppState } from '../store';

export const rootReducer = combineReducers<IAppState>({
  questions: questionsReducer,
});
