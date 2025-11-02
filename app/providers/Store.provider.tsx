"use client";

import { FC, useRef } from "react";

import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "../lib/store";
import { Layout } from "../types/layout.types";

export const StoreProvider: FC<Layout> = (props) => {
  const { children } = props;
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) storeRef.current = makeStore();

  setupListeners(storeRef.current.dispatch);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
