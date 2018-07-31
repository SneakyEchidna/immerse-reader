import { fork, put, all, select, takeEvery } from 'redux-saga/effects';
import { GET_DEFINITIONS, SET_LOCATION } from '../actions/actionTypes';
import { setDefinitions } from '../actions';
import { getIdentifier } from '../reducers/readerReducer';

function* callGetDefinitions({ payload }) {
  const callApi = async word => {
    const response = await fetch(`/api/${word}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  const def = yield callApi(payload);
  yield put(setDefinitions(def));
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
export default function* rootSaga() {
  yield all([fork(getdefinitionsSaga), fork(setLocationSaga)]);
}
