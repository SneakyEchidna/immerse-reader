import { takeEvery, select, put, take } from 'redux-saga/effects';
import { getUid } from '../reducers/userReducer';
import {
  LOAD_BOOKS_LIST,
  SET_USER,
  UPLOAD_BOOK,
  OPEN_BOOK
} from '../actions/actionTypes';
import { setBooksList, loadBooksList, openBookSuccess } from '../actions';
import { Storage } from '../api';

const storage = new Storage();

function* callLoadBooksList() {
  const getBooksList = async uid => {
    const data = await storage.getBooks(uid);
    const entries = Object.entries(data);
    const books = entries.map(([key, value]) => ({
      name: value.name,
      author: value.author,
      key
    }));
    return books;
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
  yield storage.addBook(uid, payload);
  yield put(loadBooksList());
}
function* callOpenBook({ payload }) {
  let uid = yield select(getUid);

  while (!uid) {
    yield take(SET_USER);
    uid = yield select(getUid);
  }

  const book = yield storage.getBook(uid, payload.key);
  yield put(openBookSuccess(payload.name, payload.author, book));
}

export function* uploadBookSaga() {
  yield takeEvery(UPLOAD_BOOK, callUploadBook);
}
export function* loadBooksListSaga() {
  yield takeEvery(LOAD_BOOKS_LIST, callLoadBooksList);
}
export function* openBookSaga() {
  yield takeEvery(OPEN_BOOK, callOpenBook);
}
