import {
  GET_DEFINITIONS,
  SET_DEFINITIONS,
  BOOK_LOADED,
  EVENTS_LOADED,
  SET_IDENTIFIER,
  SET_LOCATION,
} from './actionTypes';

export const getDefinitions = word => ({
  type: GET_DEFINITIONS,
  payload: word,
});

export const setDefinitions = def => ({
  type: SET_DEFINITIONS,
  payload: def,
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
