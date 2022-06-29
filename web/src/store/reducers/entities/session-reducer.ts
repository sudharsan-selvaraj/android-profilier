import { ReduxActionType } from "../../../interfaces/redux";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type SessionEntityType = {
  items: [];
  isLoading: boolean;
  isUpdating: boolean;
  isSuccess: boolean;
};

const initialState: SessionEntityType = {
  items: [],
  isLoading: false,
  isUpdating: false,
  isSuccess: true,
};

export default createReducer(initialState, {
  [ReduxActionTypes.FETCH_SESSIONS]: (state: any) => ({
    ...state,
    items: [],
    isLoading: true,
  }),
  [ReduxActionTypes.FETCH_SESSIONS_SUCCESS]: (
    state: any,
    action: ReduxActionType<any>,
  ) => ({
    ...state,
    items: action.payload.data,
    isLoading: false,
  }),
  [ReduxActionTypes.CREATE_SESSION]: (state: any) => ({
    ...state,
    isUpdating: true,
  }),
  [ReduxActionTypes.UPDATE_SESSION]: (state: any) => ({
    ...state,
    isUpdating: true,
  }),
  [ReduxActionTypes.UPDATE_SESSION_COMPLETE]: (
    state: any,
    action: ReduxActionType<boolean>,
  ) => ({
    ...state,
    isUpdating: false,
    isSuccess: action.payload,
  }),
});
