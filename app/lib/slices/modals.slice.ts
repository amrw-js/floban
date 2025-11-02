import { createSlice } from "@reduxjs/toolkit";

import { SLICES } from "@/app/constants/store.constants";
import { ModalsSlices } from "@/app/types/slices.types";

export const DEFAULT_MODALS: ModalsSlices = {
  taskModalOpen: false,
};

export const modalsSlice = createSlice({
  name: SLICES.MODALS,
  initialState: DEFAULT_MODALS,
  reducers: {
    toggleTaskModal(state) {
      state.taskModalOpen = !state.taskModalOpen;
    },
  },
});
