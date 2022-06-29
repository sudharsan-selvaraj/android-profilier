import React, { useEffect, useState } from "react";
import _ from "lodash";
import { PrimaryButton, SecondaryButton, Sizes } from "../atoms/button";
import Form, { FormItem } from "../atoms/forms/form";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLoader,
} from "./modal";

type EntityModalMode = "create" | "edit";

type EntityModalProps<T> = {
  open: boolean;
  onDismiss: () => any;
  mode: EntityModalMode;
  defaultValue?: T | Partial<T>;
  title: (mode: EntityModalMode) => string | string;
  formId: string;
  onSubmit: (data: T) => any;
  formItems: Array<FormItem>;
  isUpdating: boolean;
  isUpdateSuccess: boolean;
  onFormChanged?: (args: any) => void;
};

export default function EntityModal<T>(props: EntityModalProps<T>) {
  const {
    open,
    onDismiss,
    mode,
    title,
    formId,
    onSubmit,
    formItems,
    defaultValue,
    isUpdating,
    isUpdateSuccess,
    onFormChanged,
  } = props;
  const isEditMode = mode === "edit";
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (!isUpdating && isBusy) {
      setIsBusy(false);
    }
    if (!isUpdating && isUpdateSuccess) {
      onDismiss();
    }
  }, [isUpdating]);

  const onFormSubmit = (data: T) => {
    setIsBusy(true);
    onSubmit(data);
  };

  const getTitle = () => {
    if (_.isFunction(title)) {
      return title(mode);
    } else {
      return title;
    }
  };

  return (
    <Modal open={open} onClose={onDismiss}>
      {isBusy ? (
        <ModalLoader message={isEditMode ? "Updating..." : "Creating.."} />
      ) : (
        <></>
      )}
      <ModalHeader title={getTitle()} showClose onClose={onDismiss} />
      <ModalBody>
        <Form
          id={formId}
          onSubmit={onFormSubmit}
          items={formItems}
          defaultValue={defaultValue || {}}
          onFormChanged={onFormChanged}
        />
      </ModalBody>
      <ModalFooter>
        <SecondaryButton size={Sizes.S} onClick={onDismiss}>
          Close
        </SecondaryButton>
        <PrimaryButton size={Sizes.S} form={formId} type="submit">
          {isEditMode ? "Update" : "Create"}
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
}
