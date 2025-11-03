import { FC } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Chip, IconButton, Tooltip } from "@mui/material";
import cn from "clsx";

import { Columns } from "@/app/constants/board.constants";

type ColumnHeaderProps = {
  title: string;
  taskCount: number;
  className?: string;
  column: Columns;
  onAddTask?: (column: Columns) => void;
};

export const ColumnHeader: FC<ColumnHeaderProps> = ({
  title,
  taskCount,
  onAddTask,
  className,
  column,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-gray-300 p-4 pb-3",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Chip
          label={taskCount}
          size="small"
          className="bg-gray-200 font-medium text-gray-600"
        />
      </div>

      {onAddTask && (
        <Tooltip title="Add new task">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onAddTask(column)}
            aria-label={`Add task to ${title}`}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};
