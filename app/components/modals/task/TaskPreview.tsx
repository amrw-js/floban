import { FC } from "react";

import { Box } from "@mui/material";

import { Columns, COLUMNS_TITLES } from "@/app/constants/board.constants";
import { Task } from "@/app/types/board.types";

type TaskPreviewProps = {
  task: Task;
};

const getStatusLabel = (column: Columns) => COLUMNS_TITLES[column] || column;

const getStatusColor = (column: Columns) => {
  const colors = {
    [Columns.TODO]: "bg-gray-100 text-gray-700",
    [Columns.IN_PROGRESS]: "bg-blue-100 text-blue-700",
    [Columns.DONE]: "bg-green-100 text-green-700",
  } as Record<Columns, string>;

  return colors[column] || "bg-gray-100 text-gray-700";
};

export const TaskPreview: FC<TaskPreviewProps> = (props) => {
  const { task } = props;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">
          {task.title}
        </h3>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
            task.column
          )}`}
        >
          {getStatusLabel(task.column)}
        </span>
      </Box>

      {task.description && (
        <Box>
          <span className="mb-2 block text-xs font-medium text-gray-500 uppercase">
            Description
          </span>
          <p className="text-sm whitespace-pre-wrap text-gray-600">
            {task.description}
          </p>
        </Box>
      )}
    </Box>
  );
};
