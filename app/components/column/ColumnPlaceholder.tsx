import { FC } from "react";

import { InboxOutlined } from "@mui/icons-material";
import cn from "clsx";

type ColumnPlaceholderProps = {
  message?: string;
  className?: string;
};

export const ColumnPlaceHolder: FC<ColumnPlaceholderProps> = (props) => {
  const { message = "No tasks", className } = props;

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-2",
        className
      )}
    >
      <InboxOutlined className="text-5xl text-gray-400" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};
