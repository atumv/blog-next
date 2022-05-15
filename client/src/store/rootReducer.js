import { combineReducers } from 'redux';
import postReducer from './postSlice';

export const rootReducer = combineReducers({
  posts: postReducer,
});
