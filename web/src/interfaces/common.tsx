export interface ModalProps<T> {
  show: boolean;
  onDismiss: () => void;
  editMode?: {
    data: T;
  };
}

export {};
