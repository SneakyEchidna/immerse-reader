import { SET_BOOKS_LIST } from '../actions/actionTypes';

const initialState = {
  booksList: [],
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS_LIST:
      return {
        ...state,
        booksList: action.payload,
      };
    default:
      return state;
  }
};

export default booksReducer;
