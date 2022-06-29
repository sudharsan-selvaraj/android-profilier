import { all, takeLatest } from "redux-saga/effects";
import ReduxActionTypes from "../redux-action-types";
import ApplicationSaga from "./application-saga";
import SessionsSaga from "./sessions-saga";

export default function* initSaga() {
  yield all([
    takeLatest(ReduxActionTypes.INIT_APP, ApplicationSaga),
    takeLatest(ReduxActionTypes.INIT_SESSIONS_SAGA, SessionsSaga),
  ]);
}
