import { createSlice } from "@reduxjs/toolkit";

import { SLICES } from "@/app/constants/store.constants";
import { FiltersSlices } from "@/app/types/slices.types";

export const DEFAULT_FILTERS: FiltersSlices = {
  taskSearchQuery: "",
};

export const filtersSlice = createSlice({
  name: SLICES.FILTERS,
  initialState: DEFAULT_FILTERS,
  reducers: {
    setTaskSearchQuery(state, action) {
      state.taskSearchQuery = action.payload;
    },
    clearTaskSearchQuery(state) {
      state.taskSearchQuery = "";
    },
  },
});

export const { setTaskSearchQuery, clearTaskSearchQuery } =
  filtersSlice.actions;
