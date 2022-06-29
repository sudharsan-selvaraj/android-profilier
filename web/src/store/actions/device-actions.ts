import { Session } from "../../interfaces/entities/session";
import ReduxActionTypes from "../redux-action-types";

export const fetchDevicesSuccess = (payload?: any) => ({
  type: ReduxActionTypes.FETCH_DEVICES_SUCCESS,
  payload,
});
