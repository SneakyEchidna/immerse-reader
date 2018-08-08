import { SET_BOOKS_LIST, OPEN_BOOK, SIGN_OUT } from '../actions/actionTypes';

const initialState = {
  booksList: [],
  currentBook: null,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS_LIST:
      return {
        ...state,
        booksList: action.payload,
      };
    case OPEN_BOOK:
      return {
        ...state,
        currentBook: {
          name: action.payload.name,
          url: action.payload.url,
          author: action.payload.author,
        },
      };
    case SIGN_OUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default booksReducer;
