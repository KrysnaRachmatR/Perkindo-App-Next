// hooks/useConfirm.tsx
import { useState } from "react";
import ConfirmModal from "@/components/atoms/ConfirmModal";

export const useConfirm = () => {
  const [modalState, setModalState] = useState<{
    show: boolean;
    mode: "confirm" | "delete";
    message: string;
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (mode: "confirm" | "delete", message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalState({ show: true, mode, message, resolve });
    });
  };

  const Modal = modalState ? (
    <ConfirmModal
      show={modalState.show}
      mode={modalState.mode}
      message={modalState.message}
      onClose={(confirmed) => {
        modalState.resolve(confirmed);
        setModalState(null);
      }}
    />
  ) : null;

  return { confirm, Modal };
};
