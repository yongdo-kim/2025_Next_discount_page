"use client";

import { useCallback, useState } from "react";

type ModalState = {
  isOpen: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export function useModal(initialState: ModalState = { isOpen: false }) {
  const [modalState, setModalState] = useState<ModalState>(initialState);

  const openModal = useCallback((config: Omit<ModalState, "isOpen">) => {
    setModalState({
      isOpen: true,
      ...config,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const handleConfirm = useCallback(() => {
    modalState.onConfirm?.();
    closeModal();
  }, [modalState, closeModal]);

  return {
    modalState,
    openModal,
    closeModal,
    handleConfirm,
  };
}
