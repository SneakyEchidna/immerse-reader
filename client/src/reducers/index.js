import { combineReducers } from 'redux';
import definitionReducer from './definitionReducer';
import readerReducer from './readerReducer';
import userReducer from './userReducer';
import wordlistReducer from './wordlistReducer';

const reducer = combineReducers({
  definition: definitionReducer,
  reader: readerReducer,
  user: userReducer,
  wordlist: wordlistReducer,
});

export default reducer;
