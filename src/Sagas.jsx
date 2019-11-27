import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

function* onRoleSelect(action) {
  const state = yield select();
  //if all roles are selected then
}

function* onRoleSelectTimeExpired(action) {
  //progress to next step because time ran out
}

function* sagas() {
  yield [
    takeEvery("ROLE_SELECT", onRoleSelect),
    takeEvery("ROLE_SELECT_TIME_EXPIRE", onRoleSelect),
  ]
}


export default sagas;
