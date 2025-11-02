import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { Columns } from "../constants/tasks.constants";
import { Task } from "../types/tasks.types";

type UseDndTaskParams = {
  taskId: Task["id"];
  column: Columns;
  index: number;
  task: Task;
  disabled?: boolean;
};

export const useDndTask = (params: UseDndTaskParams) => {
  const { taskId, column, index, task, disabled = false } = params;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: taskId,
      disabled,
      data: {
        taskId,
        column,
        index,
        task,
        type: "task",
      },
    });

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
      }
    : undefined;

  return {
    attributes,
    listeners,
    style,
    isDragging,
    setNodeRef,
  };
};
