import { combineReducers } from "@reduxjs/toolkit";
import SessionReducer, { SessionEntityType } from "./session-reducer";
import DeviceReducer, { DevicesEntityType } from "./device-reducer";
import ProfilingReducer, { ProfilingType } from "./profiling-reducer";

export type ListEntityType<T> = {
  count: number;
  items: Array<T>;
  isLoading: boolean;
};

export type EntitiesState = {
  sessions: SessionEntityType;
  devices: DevicesEntityType;
  profiling: ProfilingType;
};

export default combineReducers({
  sessions: SessionReducer,
  devices: DeviceReducer,
  profiling: ProfilingReducer,
});
