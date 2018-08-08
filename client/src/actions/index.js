import {
  GET_DEFINITIONS,
  SET_DEFINITIONS,
  BOOK_LOADED,
  EVENTS_LOADED,
  SET_IDENTIFIER,
  SET_LOCATION,
  SIGN_IN,
  SIGN_OUT,
  APP_STARTED,
  SET_USER,
  ADD_TO_WORD_LIST,
  LOAD_WORD_LIST,
  SET_WORD_LIST,
  LOAD_BOOKS_LIST,
  SET_BOOKS_LIST,
  UPLOAD_BOOK,
} from './actionTypes';

export const getDefinitions = word => ({
  type: GET_DEFINITIONS,
  payload: word,
});

export const setDefinitions = (word, definitions) => ({
  type: SET_DEFINITIONS,
  payload: { definitions, word },
});

export const bookLoaded = () => ({
  type: BOOK_LOADED,
});

export const eventsLoaded = () => ({
  type: EVENTS_LOADED,
});

export const setIdentifier = identifier => ({
  type: SET_IDENTIFIER,
  payload: identifier,
});

export const setLocation = location => ({
  type: SET_LOCATION,
  payload: location,
});

export const signIn = () => ({
  type: SIGN_IN,
});

export const signOut = () => ({
  type: SIGN_OUT,
});
export const appStarted = () => ({
  type: APP_STARTED,
});
export const setUser = (userName, uid) => ({
  type: SET_USER,
  payload: { userName: userName, uid: uid },
});

export const addWordToWordList = (word, definitions) => ({
  type: ADD_TO_WORD_LIST,
  payload: { word, definitions },
});

export const loadWordList = () => ({
  type: LOAD_WORD_LIST,
});

export const setWordList = wordlist => ({
  type: SET_WORD_LIST,
  payload: wordlist,
});

export const loadBooksList = () => ({
  type: LOAD_BOOKS_LIST,
});

export const setBooksList = booksList => ({
  type: SET_BOOKS_LIST,
  payload: booksList,
});

export const uploadBook = data => ({
  type: UPLOAD_BOOK,
  payload: data,
});
