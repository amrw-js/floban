import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

import { SLICES } from "../constants/store.constants";
import { boardApi } from "./apis/board.api";
import { boardSlice } from "./slices/board.slice";
import { modalsSlice } from "./slices/modals.slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [boardApi.reducerPath]: boardApi.reducer,
      [SLICES.MODALS]: modalsSlice.reducer,
      [SLICES.BOARD]: boardSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(boardApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
