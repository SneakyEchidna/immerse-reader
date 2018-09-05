import {
  SET_BOOKS_LIST,
  SIGN_OUT,
  OPEN_BOOK_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  booksList: [],
  currentBook: null
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS_LIST:
      return {
        ...state,
        booksList: action.payload
      };
    case OPEN_BOOK_SUCCESS:
      return {
        ...state,
        currentBook: {
          name: action.payload.name,
          book: action.payload.book,
          author: action.payload.author,
          key: action.payload.key,
          bookmark: action.payload.bookmark
        }
      };
    case SIGN_OUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
export const getKey = state => state.books.currentBook.key;
export default booksReducer;
