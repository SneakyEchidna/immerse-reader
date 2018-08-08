import { takeEvery, select, put, take } from 'redux-saga/effects';
import { getUid } from '../reducers/userReducer';
import { LOAD_BOOKS_LIST, SET_USER } from '../actions/actionTypes';
import { setBooksList } from '../actions';

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

export function* loadBooksListSaga() {
  yield takeEvery(LOAD_BOOKS_LIST, callLoadBooksList);
}
