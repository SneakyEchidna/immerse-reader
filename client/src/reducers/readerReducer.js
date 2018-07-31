import {
  BOOK_LOADED,
  EVENTS_LOADED,
  RESET_READER,
  SET_IDENTIFIER,
  SET_LOCATION,
} from '../actions/actionTypes';

const initialState = {
  bookLoaded: false,
  eventsLoaded: false,
  location: null,
  identifier: null,
};

const readerReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_LOADED:
      return { ...state, bookLoaded: true };
    case EVENTS_LOADED:
      return { ...state, eventsLoaded: true };
    case RESET_READER:
      return { ...state, bookLoaded: false, eventsLoaded: false };
    case SET_IDENTIFIER:
      return { ...state, identifier: action.payload };
    case SET_LOCATION:
      return { ...state, location: action.payload };
    default:
      return state;
  }
};
export const getIdentifier = state => state.reader.identifier;
export default readerReducer;