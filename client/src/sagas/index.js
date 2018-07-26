import { takeEvery, delay } from 'redux-saga';
import { fork, put, select, call } from 'redux-saga/effects';
import { GET_DEFINITIONS } from '../actions/actionTypes';
import { setDefinitions } from '../actions';

function* callGetDefinitions({ payload }) {
  const callApi = async word => {
    const response = await fetch(`/api/${word}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body[0];
  };

  const def = yield callApi(payload);
  yield put(setDefinitions(def));
}

function* getdefinitionsSaga() {
  yield* takeEvery(GET_DEFINITIONS, callGetDefinitions);
}
export default function* rootSaga() {
  yield [fork(getdefinitionsSaga)];
}
