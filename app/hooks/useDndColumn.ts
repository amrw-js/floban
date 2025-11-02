import { useDroppable } from "@dnd-kit/core";

import { Columns } from "../constants/tasks.constants";

type UseDndColumnParams = {
  column: Columns;
  disabled?: boolean;
};

export const useDndColumn = (params: UseDndColumnParams) => {
  const { column, disabled = false } = params;

  const { setNodeRef, isOver, active } = useDroppable({
    id: column,
    disabled,
    data: {
      column,
      type: "column",
    },
  });

  const isDraggingOver = isOver && active?.data?.current?.type === "task";

  return {
    setNodeRef,
    isOver: isDraggingOver,
  };
};
