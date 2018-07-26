import { GET_DEFINITIONS, SET_DEFINITIONS } from './actionTypes';

export const getDefinitions = word => ({
  type: GET_DEFINITIONS,
  payload: word,
});

export const setDefinitions = def => ({
  type: SET_DEFINITIONS,
  payload: def,
});
