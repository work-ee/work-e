import { StateCreator } from "zustand";

import { ModalsActions, ModalsState } from "@/types/modals";

export const createModalsSlice: StateCreator<ModalsState & ModalsActions, [], [], ModalsState & ModalsActions> = (
  set
) => ({
  linkedInConnected: false,
  noLinkedIn: false,

  remindCV: true,
  cvUploaded: false,

  paidOverpayment: false,
  freeChecksLeft: 3,

  autoSendCV: false,

  paidSubscription: false,
  freeSendCVLeft: 100,

  setLinkedInConnected: (connected) => set({ linkedInConnected: connected }),
  setNoLinkedIn: (noLinkedIn) => set({ noLinkedIn }),

  setRemindCV: (remind) => set({ remindCV: remind }),
  setCvUploaded: (uploaded) => set({ cvUploaded: uploaded }),

  setPaidOverpayment: (paid) => set({ paidOverpayment: paid }),
  setFreeChecksLeft: (count) => set({ freeChecksLeft: count }),

  setAutoSendCV: (autoSend) => set({ autoSendCV: autoSend }),

  setPaidSubscription: (paid) => set({ paidSubscription: paid }),
  setFreeSendCVLeft: (count) => set({ freeSendCVLeft: count }),
});
