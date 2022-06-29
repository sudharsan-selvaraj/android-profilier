import { Session } from "../../interfaces/entities/session";
import ReduxActionTypes from "../redux-action-types";

export const fetchSessionList = (payload?: any) => ({
  type: ReduxActionTypes.FETCH_SESSIONS,
  payload,
});

export const fetchSessionsSuccess = (payload?: any) => ({
  type: ReduxActionTypes.FETCH_SESSIONS_SUCCESS,
  payload,
});

export const createNewSession = (payload: Omit<Session, "id">) => ({
  type: ReduxActionTypes.CREATE_SESSION,
  payload,
});

export const updateSession = (payload: Session) => ({
  type: ReduxActionTypes.UPDATE_SESSION,
  payload,
});

export const deleteSession = (payload: Session) => ({
  type: ReduxActionTypes.DELETE_SESSION,
  payload,
});

export const updateSessionComplete = (payload: boolean) => ({
  type: ReduxActionTypes.UPDATE_SESSION_COMPLETE,
  payload,
});
