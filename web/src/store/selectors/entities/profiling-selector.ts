import { AppState } from "../..";

export const getProfilingData = (state: AppState) =>
  state.entities.profiling.items;
