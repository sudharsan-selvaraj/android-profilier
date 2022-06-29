import { THEMES } from "../../constants/themes";
import ReduxActionTypes from "../redux-action-types";

export const setSelectedTheme = (payload: THEMES) => ({
  type: ReduxActionTypes.SELECTED_THEME,
  payload,
});
