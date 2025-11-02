import { FC } from "react";

import { Card, CardContent } from "@mui/material";
import cn from "clsx";

import { Columns } from "../constants/board.constants";
import { useDndTask } from "../hooks/useDndTask";
import { Task } from "../types/board.types";

type TaskCardProps = {
  task: Task;
  column: Columns;
  index: number;
  className?: string;
};

export const TaskCard: FC<TaskCardProps> = (props) => {
  const { task, column, index, className } = props;

  const { setNodeRef, attributes, listeners, style, isDragging } = useDndTask({
    taskId: task.id,
    column,
    index,
    task,
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "h-full cursor-grab transition-all hover:shadow-lg active:cursor-grabbing",
        isDragging && "opacity-0",
        className
      )}
    >
      <CardContent className="h-full">
        <div className="flex h-full flex-col gap-3">
          <h4 className="text-base font-medium text-gray-900">{task.title}</h4>

          {task.description && (
            <p className="line-clamp-2 text-sm text-gray-600">
              {task.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
