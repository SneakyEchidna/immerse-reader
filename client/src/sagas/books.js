import { takeEvery, select, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { getUid } from '../reducers/userReducer';
import { LOAD_BOOKS_LIST, SET_USER, UPLOAD_BOOK } from '../actions/actionTypes';
import { setBooksList, uploadBook } from '../actions';

function* callLoadBooksList() {
  const getBooksList = async uid => {
    const response = await fetch(`/api/books/${uid}`).catch(e =>
      console.log(e),
    );
    let body = response;
    try {
      body = await response.json();
    } catch (e) {
      console.log(e);
    }

    return body;
  };
  let uid = yield select(getUid);
  while (!uid) {
    yield take(SET_USER);
    uid = yield select(getUid);
  }
  const booksList = yield getBooksList(uid);
  yield put(setBooksList(booksList));
}

function* callUploadBook({ payload }) {
  let uid = yield select(getUid);
  while (!uid) {
    yield take(SET_USER);
    uid = yield select(getUid);
  }
  console.log(payload);
  axios.post(`/api/books/${uid}`, payload);
}

export function* uploadBookSaga() {
  yield takeEvery(UPLOAD_BOOK, callUploadBook);
}
export function* loadBooksListSaga() {
  yield takeEvery(LOAD_BOOKS_LIST, callLoadBooksList);
}
