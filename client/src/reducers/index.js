import { combineReducers } from 'redux';
import definitionReducer from './definitionReducer';

const reducer = combineReducers({
  definition: definitionReducer,
});

export default reducer;
