import { FC } from "react";

import { Chip } from "@mui/material";
import cn from "clsx";

type ColumnHeaderProps = {
  title: string;
  taskCount: number;
  className?: string;
};

export const ColumnHeader: FC<ColumnHeaderProps> = (props) => {
  const { title, taskCount, className } = props;

  return (
    <div
      className={cn(
        "mb-4 flex items-center justify-between border-b border-gray-300 p-4 pb-3",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <Chip
        label={taskCount}
        size="small"
        className="bg-gray-200 font-medium text-gray-600"
      />
    </div>
  );
};
