import { SLICES } from "@/app/constants/store.constants";
import { ModalsSlices } from "@/app/types/slices.types";

import { RootState } from "../store";

export const selectModalsSlice = (state: RootState): ModalsSlices =>
  state[SLICES.MODALS];

export const selectTaskModalOpen = (state: RootState) =>
  selectModalsSlice(state).taskModalOpen;
