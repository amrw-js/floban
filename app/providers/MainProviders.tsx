import { FC } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { Layout } from "../types/layout.types";
import { StoreProvider } from "./Store.provider";

export const MainProviders: FC<Layout> = (props) => {
  const { children } = props;

  return (
    <StoreProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        {children}
      </AppRouterCacheProvider>
    </StoreProvider>
  );
};
