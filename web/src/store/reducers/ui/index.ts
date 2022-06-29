import { combineReducers } from "redux";
import AppInitialised, { AppInitilisedState } from "./app-initialised";
import ThemeReducer, { ThemeState } from "./theme-reducer";
import ToastReducer, { ToastEntityType } from "./toast-reducer";

export type UIState = {
  theme: ThemeState;
  toast: ToastEntityType;
  appInitialised: AppInitilisedState;
};

export default combineReducers({
  theme: ThemeReducer,
  toast: ToastReducer,
  appInitialised: AppInitialised,
});
