import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import Config from './Config';
import CreateActions from "./CreateActions";
const actions = CreateActions();

function* onStartGame(action) {
  const state = yield select();
  var callback = () => {
    put(actions.roleSelectTimeExpired());
  };
  yield put(actions.setTimeRemaining(Config.TIME_TO_CHOOSE_ROLE, callback));
}

function* setTimeRemaining(action) {
  const state = yield select();
  if(state.timeRemaining > 0){
    setTimeout(() => {
      put(actions.setTimeRemaining(state.timeRemaining - 1));
    }, Config.TIME_INTERVAL);
  } else {
    callback();
  }
}

function* onRoleSelect(action) {
  const state = yield select();
  //if all roles are selected then
}

function* onRoleSelectTimeExpired(action) {
  //progress to next step because time ran out
}

function* sagas() {
  yield [
    takeEvery("START_GAME", onStartGame),
    takeEvery("SET_TIME_REMAINING", setTimeRemaining),
    takeEvery("ROLE_SELECT", onRoleSelect),
    takeEvery("ROLE_SELECT_TIME_EXPIRE", onRoleSelect),
  ]
}


export default sagas;
