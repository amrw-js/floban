import { createSlice } from "@reduxjs/toolkit";

import { SLICES } from "@/app/constants/store.constants";
import { ModalsSlices } from "@/app/types/slices.types";

export const DEFAULT_MODALS: ModalsSlices = {
  taskModalOpen: false,
  previewedTaskId: null,
  createTaskFor: null,
};

export const modalsSlice = createSlice({
  name: SLICES.MODALS,
  initialState: DEFAULT_MODALS,
  reducers: {
    toggleTaskModal(state) {
      state.taskModalOpen = !state.taskModalOpen;
    },
    setCreateTaskFor(state, action) {
      state.createTaskFor = action.payload;
    },
    setPreviewedTaskId(state, action) {
      state.previewedTaskId = action.payload;
    },
  },
});

export const { toggleTaskModal, setPreviewedTaskId, setCreateTaskFor } =
  modalsSlice.actions;
