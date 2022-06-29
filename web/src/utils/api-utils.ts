import { ApiResponse } from "../interfaces/api";

export function isSuccessResponse(responseObject: ApiResponse<any>) {
  return responseObject.success != false;
}
