import { FC } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@mui/material";
import cn from "clsx";

import { Columns } from "../constants/board.constants";
import { Task } from "../types/board.types";

type TaskCardProps = {
  task: Task;
  index: number;
  column: Columns | null;
  className?: string;
  onClick?: (task: Task, column: Columns | null) => void;
};

export const TaskCard: FC<TaskCardProps> = (props) => {
  const { task, className, index, column, onClick } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id.toString(),
    data: { ...task, index, column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = () => {
    if (onClick && !isDragging) {
      onClick(task, column);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={cn(
        "h-full cursor-pointer transition-all select-none hover:shadow-lg active:cursor-grabbing",
        isDragging && "opacity-50",
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
