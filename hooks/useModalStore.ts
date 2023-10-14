import { Server } from "@prisma/client";
import React from "react";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "manageMembers";

interface ModalData {
  server?: Server;
}

interface ModalStoreProps {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

const useModalStore = create<ModalStoreProps>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

export default useModalStore;
