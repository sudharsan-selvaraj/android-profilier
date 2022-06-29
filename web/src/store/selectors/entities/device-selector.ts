import { AppState } from "../..";

export const getDeviceList = (state: AppState) => state.entities.devices.items;
