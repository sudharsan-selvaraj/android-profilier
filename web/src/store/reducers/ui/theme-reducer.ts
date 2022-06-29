import createReducer from "../../../utils/createReducer";
import themes, {
  ThemeConfig,
  DEFAULT_THEME,
  THEMES,
} from "../../../constants/themes";
import ReduxActionTypes from "../../redux-action-types";
import { ReduxActionType } from "../../../interfaces/redux";

export type ThemeState = {
  name: string;
  config: ThemeConfig;
};
const storedTheme: THEMES =
  localStorage.getItem("theme") != null
    ? (localStorage.getItem("theme") as THEMES)
    : DEFAULT_THEME;

const initialState: ThemeState = {
  name: storedTheme,
  config: themes[(storedTheme || DEFAULT_THEME) as THEMES],
};

export default createReducer(initialState, {
  [ReduxActionTypes.SELECTED_THEME]: (
    state: ThemeState,
    action: ReduxActionType<string>,
  ) => {
    localStorage.setItem("theme", action.payload);
    return {
      ...state,
      name: action.payload,
      config: (themes as Record<string, ThemeConfig>)[
        action.payload || DEFAULT_THEME
      ],
    };
  },
});
