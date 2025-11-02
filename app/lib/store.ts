import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

import { SLICES } from "../constants/store.constants";
import { tasksApi } from "./apis/tasks.api";
import { modalsSlice } from "./slices/modals.slice";
import { tasksSlice } from "./slices/tasks.slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [tasksApi.reducerPath]: tasksApi.reducer,
      [SLICES.MODALS]: modalsSlice.reducer,
      [SLICES.TASKS]: tasksSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
