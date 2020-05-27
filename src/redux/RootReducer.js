
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postsReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer
});

export default RootReducer