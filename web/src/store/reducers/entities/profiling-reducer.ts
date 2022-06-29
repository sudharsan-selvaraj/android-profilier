import { ReduxActionType } from "../../../interfaces/redux";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type ProfilingType = {
  items: [];
};

const initialState: ProfilingType = {
  items: [],
};

export default createReducer(initialState, {
  [ReduxActionTypes.ADD_NEW_PROFILING]: (
    state: any,
    action: ReduxActionType<any>,
  ) => {
    return {
      ...state,
      items: state.items.concat(...action.payload),
    };
  },
});
