import { ReduxActionType } from "../../../interfaces/redux";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type ToastEntityType = {
  errors: Array<string>;
  success: Array<string>;
};

const initialState: ToastEntityType = {
  errors: [],
  success: [],
};

export default createReducer(initialState, {
  [ReduxActionTypes.SHOW_ERROR_TOAST]: (
    state: any,
    action: ReduxActionType<string>,
  ) => ({
    ...state,
    errors: [...state.errors, action.payload],
  }),
  [ReduxActionTypes.SHOW_SUCCESS_TOAST]: (
    state: any,
    action: ReduxActionType<string>,
  ) => ({
    ...state,
    success: [...state.success, action.payload],
  }),
});
