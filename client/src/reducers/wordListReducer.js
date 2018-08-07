import { SET_WORD_LIST } from '../actions/actionTypes';

const initialState = {
  wordlist: [],
};

const wordListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORD_LIST:
      return {
        ...state,
        wordlist: action.payload,
      };
    default:
      return state;
  }
};

export default wordListReducer;
