import ReduxActionTypes from "../redux-action-types";

export const showErrorToaster = (payload: string) => ({
  type: ReduxActionTypes.SHOW_ERROR_TOAST,
  payload,
});

export const showSuccessToaster = (payload: string) => ({
  type: ReduxActionTypes.SHOW_SUCCESS_TOAST,
  payload,
});
