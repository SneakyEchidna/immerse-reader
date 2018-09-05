import { fork, put, all, select, takeEvery } from 'redux-saga/effects';
import {
  GET_DEFINITIONS,
  SET_LOCATION,
  SET_IDENTIFIER
} from '../actions/actionTypes';
import { setDefinitions, setLocation } from '../actions';
import { signInSaga, signOutSaga } from './auth';
import appStartedSaga from './appStartedSaga';
import { addToWordListSaga, loadWordListSaga } from './wordlist';
import {
  loadBooksListSaga,
  uploadBookSaga,
  openBookSaga,
  deleteBookSaga,
  saveBookmarkSaga
} from './books';
import { getKey } from '../reducers/booksReducer';

function* callGetDefinitions({ payload }) {
  const callApi = async word => {
    const response = await fetch(`/api/definitions/${word}`).catch(() => [
      `No exact matches found for "${word}"`
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
  const key = yield select(getKey);
  const location = payload;
  yield localStorage.setItem(key, JSON.stringify(location));
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
    fork(addToWordListSaga),
    fork(loadWordListSaga),
    fork(loadBooksListSaga),
    fork(uploadBookSaga),
    fork(openBookSaga),
    fork(deleteBookSaga),
    fork(saveBookmarkSaga)
  ]);
}
