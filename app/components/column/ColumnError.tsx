import { FC } from "react";

import { ErrorOutline } from "@mui/icons-material";
import cn from "clsx";

type ColumnErrorProps = {
  message?: string;
  className?: string;
};

export const ColumnError: FC<ColumnErrorProps> = (props) => {
  const { message = "Failed to load tasks", className } = props;

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center px-4",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <ErrorOutline className="text-5xl text-red-600" />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
          <p className="text-xs text-gray-500">
            Something went wrong while loading the data
          </p>
        </div>
      </div>
    </div>
  );
};
