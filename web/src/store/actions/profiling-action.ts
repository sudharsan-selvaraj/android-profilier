import ReduxActionTypes from "../redux-action-types";

export const addProfilingData = (payload?: any[]) => ({
  type: ReduxActionTypes.ADD_NEW_PROFILING,
  payload,
});
