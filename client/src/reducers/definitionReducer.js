import { SET_DEFINITIONS, GET_DEFINITIONS } from '../actions/actionTypes';

const initialState = {
  showDefinition: true,
  word: null,
  definitions: [],
  loading: false,
};

const definitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFINITIONS:
      return {
        ...state,
        definitions: action.payload.definitions,
        word: action.payload.word,
        loading: false,
      };
    case GET_DEFINITIONS:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default definitionReducer;
