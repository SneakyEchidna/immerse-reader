import { combineReducers } from 'redux';
import definitionReducer from './definitionReducer';
import readerReducer from './readerReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  definition: definitionReducer,
  reader: readerReducer,
  user: userReducer,
});

export default reducer;
