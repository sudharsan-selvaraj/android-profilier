const ReduxActionTypes = {
  INIT_APP: "INIT_APP",
  INIT_SESSION_SAGA: "INIT_SESSION_SAGA",
  //Theme
  SELECTED_THEME: "SELECTED_THEME",

  //Projects
  INIT_SESSIONS_SAGA: "INIT_SESSIONS_SAGA",
  //Sessions
  FETCH_SESSIONS: "FETCH_SESSIONS",
  FETCH_SESSIONS_SUCCESS: "FETCH_SESSIONS_SUCCESS",
  CREATE_SESSION: "CREATE_SESSION",
  UPDATE_SESSION: "UPDATE_SESSION",
  DELETE_SESSION: "DELETE_SESSION",
  UPDATE_SESSION_COMPLETE: "UPDATE_SESSION_COMPLETE",
  //Devices
  FETCH_DEVICES_SUCCESS: "FETCH_DEVICES_SUCCESS",

  //Profiling
  ADD_NEW_PROFILING: "ADD_NEW_PROFILING",

  //Toast
  SHOW_ERROR_TOAST: "SHOW_ERROR_TOAST",
  SHOW_SUCCESS_TOAST: "SHOW_SUCCESS_TOAST",

  //polling
  POLLING_INIT: "POLLING_INIT",
  POLLING_STOP: "POLLING_STOP",
  ADD_POLLING_TASK: "ADD_POLLING_TASK",
  REMOVE_POLLING_TASK: "REMOVE_POLLING_TASK",
};

export default ReduxActionTypes;
