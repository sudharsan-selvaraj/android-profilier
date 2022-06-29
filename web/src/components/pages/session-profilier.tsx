import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { showErrorToaster } from "../../store/actions/toast-actions";
import { getSessionsByUUID } from "../../store/selectors/entities/session-selector";
import { socket } from "../../socket/client";
import { Session } from "../../interfaces/entities/session";
import SummaryPage from "../layouts/sumary-page";
import styled from "styled-components";
import AppLoader from "./app-loader";
import ProfilingChart from "../UI/organisms/profiling-chart";
import { addProfilingData } from "../../store/actions/profiling-action";

const HeaderHeight = 80;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SessionHeader = styled.div`
  width: 100%;
  height: ${HeaderHeight}px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const SessionBody = styled.div`
  width: 100%;
  height: calc(100% - ${HeaderHeight}px);
  display: flex;
  flex-direction: column;
`;

export default function SessionProfiler() {
  const { sessionId } = useParams() as any;
  const history = useHistory();
  const dispatch = useDispatch();
  const session: any = useSelector(getSessionsByUUID(sessionId));

  useEffect(() => {
    if (!session) {
      history.push("/sessions");
      dispatch(showErrorToaster(`Session with id ${sessionId} not found`));
      return;
    } else if (!session.completed) {
      socket.on("profiling_data", (log) => {
        dispatch(addProfilingData([log]));
      });

      socket.emit("start_session", { sessionId }, (args: any[]) => {
        const opts: { logs: any[]; alreadyStarted: boolean } = args[0];
        dispatch(addProfilingData(opts.logs));
      });

      return () => {
        socket.emit("leave_room", { sessionId });
      };
    }
  });

  return (
    <SummaryPage header="Session Profiling">
      {!session ? (
        <AppLoader />
      ) : (
        <Container>
          <SessionHeader>{session.name}</SessionHeader>
          <SessionBody>
            <ProfilingChart session={session} parentHeight={0} />
          </SessionBody>
        </Container>
      )}
    </SummaryPage>
  );
}
