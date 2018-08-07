import { takeEvery, select } from 'redux-saga/effects';
import { getUid } from '../reducers/userReducer';
import { ADD_TO_WORD_LIST } from '../actions/actionTypes';
import Db from '../api';

const db = new Db();
function* callAddToWordList({ payload }) {
  const user = yield select(getUid);
  yield db.addWord(user, payload);
}
export default function* addToWordListSaga() {
  yield takeEvery(ADD_TO_WORD_LIST, callAddToWordList);
}
