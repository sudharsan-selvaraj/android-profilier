import { AppState } from "../..";
import { Session } from "../../../interfaces/entities/session";

export const getSessionsList = (state: AppState) =>
  state.entities.sessions.items;

export const isSessionsLoaded = (state: AppState) =>
  state.entities.sessions.isInitialized;

export const getSessionsByUUID = (sessionUUID: string) => {
  return (state: AppState) =>
    state.entities.sessions.items.find((s: Session) => s.uuid == sessionUUID);
};

export const isSessionLoading = (state: AppState) =>
  state.entities.sessions.isLoading;

export const isSessionUpdating = (state: AppState) =>
  state.entities.sessions.isUpdating;

export const isSessionUpdateSuccess = (state: AppState) =>
  state.entities.sessions.isSuccess;
