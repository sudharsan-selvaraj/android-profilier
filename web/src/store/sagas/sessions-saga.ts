import { all, put, takeEvery } from "redux-saga/effects";
import { ApiResponse } from "../../interfaces/api";
import ReduxActionTypes from "../redux-action-types";
import DashboardApi from "../../api/dashboard";

import { ReduxActionType } from "../../interfaces/redux";
import { isSuccessResponse } from "../../utils/api-utils";
import { showErrorToaster, showSuccessToaster } from "../actions/toast-actions";
import {
  fetchSessionList,
  fetchSessionsSuccess,
  updateSessionComplete,
} from "../actions/session-actions";
import { Session } from "inspector";

/* Priority */
function* fetchSessions() {
  const response: ApiResponse<any> = yield DashboardApi.getAllSessions();
  const isSuccess = isSuccessResponse(response);
  if (isSuccess) {
    yield put(
      fetchSessionsSuccess({
        data: response.data,
      }),
    );
  } else {
    yield put(
      fetchSessionsSuccess({
        data: [],
      }),
    );
    yield put(showErrorToaster(`Unable to fetch sessions`));
  }
}

function* createNewSession(action: ReduxActionType<Omit<Session, "id">>) {
  const response: ApiResponse<any> = yield DashboardApi.createNewSession(
    action.payload,
  );
  const isSuccess = isSuccessResponse(response);
  yield put(updateSessionComplete(isSuccess));
  if (isSuccess) {
    yield put(showSuccessToaster(`Created new Session`));
    yield put(fetchSessionList());
  } else {
    yield put(showErrorToaster(response.message || ""));
  }
}

function* deleteSession(action: ReduxActionType<number>) {
  const response: ApiResponse<any> = yield DashboardApi.deleteSession(
    action.payload,
  );
  const isSuccess = isSuccessResponse(response);

  if (isSuccess) {
    yield put(
      showSuccessToaster(
        `Successfully deleted Session with id: ${action.payload}`,
      ),
    );
    yield put(fetchSessionList());
  } else {
    yield put(showErrorToaster(response.message || ""));
  }
}

export default function* () {
  yield all([takeEvery(ReduxActionTypes.FETCH_SESSIONS, fetchSessions)]);
  yield all([takeEvery(ReduxActionTypes.CREATE_SESSION, createNewSession)]);
  yield all([takeEvery(ReduxActionTypes.DELETE_SESSION, deleteSession)]);
}
