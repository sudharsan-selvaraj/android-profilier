import { Session } from "inspector";
import Api from "./index";

export default class DashboardApi {
  public static getAllSessions(
    filterParams?: Record<string, string>,
  ): Promise<any> {
    return Api.get("/sessions", filterParams || {});
  }

  public static createNewSession(data?: Omit<Session, "id">): Promise<any> {
    return Api.post("/sessions", data);
  }

  public static deleteSession(sessionId: number): Promise<any> {
    return Api.delete(`/sessions/${sessionId}`);
  }
}
