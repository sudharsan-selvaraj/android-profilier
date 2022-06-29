import { AppState } from "../..";

export const getErrorToastMessages = (state: AppState) => state.ui.toast.errors;

export const getSuccessToastMessages = (state: AppState) =>
  state.ui.toast.success;
