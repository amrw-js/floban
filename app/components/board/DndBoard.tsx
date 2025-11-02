"use client";

import { FC, ReactNode } from "react";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useBoardDnd } from "../../hooks/useBoardDnd";
import { TaskCard } from "../TaskCard";

type DndBoardProps = {
  children: ReactNode;
};

export const DndBoard: FC<DndBoardProps> = (props) => {
  const { children } = props;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const { activeTask, handleDragStart, handleDragEnd } = useBoardDnd();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}

      <DragOverlay dropAnimation={null}>
        {activeTask && (
          <TaskCard
            className="scale-105 rotate-3 cursor-grabbing opacity-95 shadow-2xl"
            task={activeTask}
            column={activeTask.column}
            index={0}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
