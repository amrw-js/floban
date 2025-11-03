import { Dispatch, SetStateAction } from "react";

import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import { Columns } from "../constants/board.constants";
import { useMoveTaskMutation } from "../lib/apis/board.api";
import { moveTaskLocally } from "../lib/slices/board.slice";
import { useAppDispatch } from "../lib/store";
import { Task } from "../types/board.types";

type TaskDndProps = {
  setActiveTask: Dispatch<SetStateAction<Task | null>>;
  setOverIndex: Dispatch<SetStateAction<number | null>>;
  setOverColumn: Dispatch<SetStateAction<Columns | null>>;
};

export const useTaskDnd = ({
  setActiveTask,
  setOverIndex,
  setOverColumn,
}: TaskDndProps) => {
  const dispatch = useAppDispatch();
  const [moveTask] = useMoveTaskMutation();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask?.(active.data.current as Task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setOverIndex(null);
      setOverColumn(null);
      setActiveTask(null);
      return;
    }

    const activeTask = active.data.current!;
    const overData = over.data.current!;

    if (!overData) {
      setOverIndex(null);
      setOverColumn(null);
      setActiveTask(null);
      return;
    }

    const fromColumn = activeTask.column;
    const toColumn = overData.column;
    const fromIndex = activeTask.index;
    const toIndex = overData.index ?? 0;

    // Don't do anything if dropped in same position
    if (fromColumn === toColumn && fromIndex === toIndex) {
      setOverIndex(null);
      setOverColumn(null);
      setActiveTask(null);
      return;
    }

    // Calculate new order
    const newOrder = toIndex;

    console.log(
      `Moving task ${active.id} from ${fromColumn}[${fromIndex}] to ${toColumn}[${toIndex}]`
    );

    // 1. Optimistic update - update UI immediately
    dispatch(
      moveTaskLocally({
        taskId: active.id.toString(),
        from: fromColumn,
        to: toColumn,
        toIndex,
        newOrder,
      })
    );

    moveTask({
      taskId: active.id.toString(),
      newColumn: toColumn,
      newOrder,
    }).catch((error) => {
      console.error("Failed to move task:", error);
    });

    setOverIndex(null);
    setOverColumn(null);
    setActiveTask(null);
  };

  const handleDragOver = (event: DragEndEvent) => {
    const { over } = event;
    if (over?.data?.current) {
      setOverIndex(over.data.current.index);
      setOverColumn(over.data.current.column);
    } else {
      setOverIndex(null);
      setOverColumn(null);
    }
  };

  const handleDragCancel = () => {
    setActiveTask(null);
    setOverIndex(null);
    setOverColumn(null);
  };

  return { handleDragStart, handleDragEnd, handleDragOver, handleDragCancel };
};
