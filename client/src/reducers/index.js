import { combineReducers } from 'redux';
import definitionReducer from './definitionReducer';
import readerReducer from './readerReducer';

const reducer = combineReducers({
  definition: definitionReducer,
  reader: readerReducer,
});

export default reducer;
