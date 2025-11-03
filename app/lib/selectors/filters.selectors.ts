import { SLICES } from "@/app/constants/store.constants";
import { FiltersSlices } from "@/app/types/slices.types";

import { RootState } from "../store";

export const selectFiltersSlice = (state: RootState): FiltersSlices =>
  state[SLICES.FILTERS];

export const selectTaskSearchQuery = (state: RootState) =>
  selectFiltersSlice(state).taskSearchQuery;
