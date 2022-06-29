import React, { useCallback, useEffect, useState } from "react";
import SessionsModal from "./sessions-modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteSession,
  fetchSessionList,
} from "../../../store/actions/session-actions";
import {
  getSessionsList,
  isSessionLoading,
} from "../../../store/selectors/entities/session-selector";
import Panel from "../../UI/organisms/panel";
import AppLoader from "../app-loader";
import SummaryTable from "../../UI/organisms/sumary-table";
import Spinner from "../../UI/atoms/spinner";
import { Session } from "../../../interfaces/entities/session";
import Icon, { Sizes } from "../../UI/atoms/icon";

const SESSIONS_COLUMNS_CONFIG = [
  {
    key: "id",
    label: "ID",
    width: 5,
  },
  {
    key: "name",
    label: "Name",
    width: 30,
  },
  {
    key: "device_name",
    label: "Device",
    width: 15,
  },
  {
    key: "device_version",
    label: "Android Version",
    width: 10,
  },
  {
    key: "app_bundle_id",
    label: "Application",
    width: 20,
  },
  {
    key: "status",
    label: "Status",
    width: 10,
    getValue: (row: Session) => {
      return row.completed ? (
        <Icon name="tick" color="green" size={Sizes.XL} />
      ) : (
        <Spinner />
      );
    },
  },
];

export default function SessionsTable() {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    show: false,
    isEdit: false,
    row: {},
  });
  const sessionList = useSelector(getSessionsList);
  const sessionLoading = useSelector(isSessionLoading);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchSessionList());
  }, []);

  const onCreateNewClicked = useCallback(() => {
    setModalState({
      row: {},
      show: true,
      isEdit: false,
    });
  }, []);

  const onModalDismissed = useCallback(() => {
    setModalState({
      ...modalState,
      show: false,
    });
  }, []);

  const onRowEdit = useCallback((row: any) => {
    setModalState({
      show: true,
      row: row,
      isEdit: true,
    });
  }, []);

  const onRowDelete = useCallback((row: any) => {
    dispatch(deleteSession(row.id));
  }, []);

  return (
    <Panel
      {...{ height: "100%", width: "100%", heading: "Sessions" }}
      allowCreation
      creationTooltip="Create new Session"
      onCreate={onCreateNewClicked}
    >
      {sessionLoading ? (
        <AppLoader />
      ) : (
        <SummaryTable
          columns={SESSIONS_COLUMNS_CONFIG}
          rows={sessionList}
          height="100%"
          menuItem={[
            {
              name: "Delete",
              icon: "delete",
              handler: ({ props }) => {
                onRowDelete(props);
              },
            },
          ]}
          onRowClicked={(session: Session) => {
            history.push(`/sessions/${session.uuid}`);
          }}
        />
      )}
      <SessionsModal
        show={modalState.show}
        onDismiss={onModalDismissed}
        editMode={
          modalState.isEdit
            ? {
                data: modalState.row as any,
              }
            : undefined
        }
      />
    </Panel>
  );
}
