import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalProps } from "../../../interfaces/common";
import { Session } from "../../../interfaces/entities/session";
import {
  createNewSession,
  updateSession,
} from "../../../store/actions/session-actions";
import { getDeviceList } from "../../../store/selectors/entities/device-selector";
import {
  getSessionsList,
  isSessionUpdateSuccess,
  isSessionUpdating,
} from "../../../store/selectors/entities/session-selector";
import { FormDropDownType, FormItem } from "../../UI/atoms/forms/form";
import EntityModal from "../../UI/organisms/entity-modal";

export default function PdgModal(props: ModalProps<Session>) {
  const { show, onDismiss, editMode } = props;
  const dispatch = useDispatch();
  const deviceList = useSelector(getDeviceList);
  const sessionUpdating = useSelector(isSessionUpdating);
  const sessionUpdatingSuccess = useSelector(isSessionUpdateSuccess);
  const isEditMode = !!editMode;

  const onCreate = (data: Session) => {
    if (!isEditMode) {
      dispatch(createNewSession(data));
    } else {
      dispatch(updateSession({ ...{ id: editMode.data.id }, ...data }));
    }
  };

  const FORM_ITEMS: FormItem[] = [
    {
      name: "deviceUdid",
      type: "dropdown",
      label: "Device",
      helpText: "",
      placeholder: "Select device",
      rules: {
        required: "Session name is required",
      },
      options: deviceList.map((d: any) => ({
        value: d.udid,
        label: d.name,
        subLabel: `v${d.version}`,
      })),
    } as FormDropDownType,
    {
      name: "sessionName",
      type: "input",
      label: "Session Name",
      helpText: "",
      rules: {
        required: "Session name is required",
      },
    },
    {
      name: "bundleId",
      type: "input",
      label: "App bundle Id",
      helpText: "Example: com.youtube",
      rules: {
        required: "Session name is required",
      },
    },
  ];

  return (
    <EntityModal
      open={show}
      mode={isEditMode ? "edit" : "create"}
      defaultValue={isEditMode ? editMode.data : {}}
      title={(mode) => (mode == "edit" ? "Edit Session" : "Create new Session")}
      formItems={FORM_ITEMS}
      isUpdating={sessionUpdating}
      isUpdateSuccess={sessionUpdatingSuccess}
      onSubmit={onCreate}
      onDismiss={onDismiss}
      formId={"session-create-modal"}
      onFormChanged={(...args) => {
        console.log(args);
      }}
    />
  );
}
