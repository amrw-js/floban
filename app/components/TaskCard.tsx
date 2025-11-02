import { FC } from "react";

import { Card, CardContent } from "@mui/material";
import cn from "clsx";

import { Task } from "../types/tasks.types";

type TaskCardProps = {
  task: Task;
  className?: string;
};

export const TaskCard: FC<TaskCardProps> = (props) => {
  const { task, className } = props;

  return (
    <Card className={cn("h-full transition-shadow hover:shadow-lg", className)}>
      <CardContent>
        <div className="flex flex-col gap-3">
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
