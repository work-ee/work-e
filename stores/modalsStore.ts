import { create } from "zustand";

import { ModalsActions, ModalsState } from "@/types/modals";

import { createModalsSlice } from "./modalsActions";

export const useModalsStore = create<ModalsState & ModalsActions>()((...args) => ({
  ...createModalsSlice(...args),
}));
