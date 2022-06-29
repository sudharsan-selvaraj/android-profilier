import { AppState } from "../..";

export const getSelectedTheme = (state: AppState) => state.ui.theme.config;

export const getSelectedThemeName = (state: AppState) => state.ui.theme.name;
