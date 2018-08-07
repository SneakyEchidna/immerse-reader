import { fork, put, all, select, takeEvery } from 'redux-saga/effects';
import {
  GET_DEFINITIONS,
  SET_LOCATION,
  SET_IDENTIFIER,
} from '../actions/actionTypes';
import { setDefinitions, setLocation } from '../actions';
import { getIdentifier } from '../reducers/readerReducer';
import { signInSaga, signOutSaga } from './auth';
import appStartedSaga from './appStartedSaga';

function* callGetDefinitions({ payload }) {
  const callApi = async word => {
    const response = await fetch(`/api/${word}`).catch(() => [
      `No exact matches found for "${word}"`,
    ]);
    let body = response;
    try {
      body = await response.json();
    } catch (e) {
      body = [`No exact matches found for "${word}"`];
    }

    return body;
  };

  const def = yield callApi(payload);
  yield put(setDefinitions(payload, def));
}

function* callSetLocation({ payload }) {
  const identifier = yield select(getIdentifier);
  const location = payload;
  yield localStorage.setItem(identifier, JSON.stringify(location));
}

function* getdefinitionsSaga() {
  yield takeEvery(GET_DEFINITIONS, callGetDefinitions);
}
function* setLocationSaga() {
  yield takeEvery(SET_LOCATION, callSetLocation);
}
function* callSetIdentifier({ payload }) {
  const identifier = payload;
  let location = localStorage.getItem(identifier);
  try {
    yield (location = JSON.parse(location));
  } catch (e) {
    console.log('json parse error');
  }
  if (typeof location !== 'string') {
    location = null;
  }

  yield put(setLocation(location));
}
function* setIdentifierSaga() {
  yield takeEvery(SET_IDENTIFIER, callSetIdentifier);
}

export default function* rootSaga() {
  yield all([
    fork(appStartedSaga),
    fork(signInSaga),
    fork(signOutSaga),
    fork(setIdentifierSaga),
    fork(getdefinitionsSaga),
    fork(setLocationSaga),
  ]);
}
