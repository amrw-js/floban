import { useCallback, useState } from "react";

import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import { Columns } from "../constants/tasks.constants";
import { useUpdateTaskMutation } from "../lib/apis/tasks.api";
import { Task } from "../types/tasks.types";

export const useBoardDnd = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [updateTask] = useUpdateTaskMutation();

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;

    if (data?.type === "task" && data.task) {
      setActiveTask(data.task);
    }
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveTask(null);

      if (!over) return;

      const activeData = active.data.current;
      const overData = over.data.current;

      if (activeData?.type === "task" && overData?.type === "column") {
        const sourceColumn = activeData.column as Columns;
        const destinationColumn = overData.column as Columns;
        const taskId = activeData.taskId as string;

        if (sourceColumn === destinationColumn) return;

        try {
          console.log(taskId, destinationColumn);
          updateTask({
            id: taskId,
            task: { column: destinationColumn },
          });
          // RTK Query will automatically invalidate tags and refetch
          // await updateTask({
          //   id: taskId,
          //   task: { column: destinationColumn },
          // }).unwrap();
        } catch (error) {
          console.error("Failed to move task:", error);
        }
      }
    },
    [updateTask]
  );

  return {
    activeTask,
    handleDragStart,
    handleDragEnd,
  };
};
