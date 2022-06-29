import { ReduxActionType } from "../../../interfaces/redux";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type DevicesEntityType = {
  items: [];
  isLoading: boolean;
  isUpdating: boolean;
  isSuccess: boolean;
};

const initialState: DevicesEntityType = {
  items: [],
  isLoading: false,
  isUpdating: false,
  isSuccess: true,
};

export default createReducer(initialState, {
  [ReduxActionTypes.FETCH_DEVICES_SUCCESS]: (
    state: any,
    action: ReduxActionType<any>,
  ) => {
    return {
      ...state,
      items: action.payload,
      isLoading: false,
    };
  },
});
