"use client";

import { useState } from "react";

import { DndContext, DragOverlay } from "@dnd-kit/core";

import { useTaskDnd } from "@/app/hooks/useTaskDnd";
import { Task } from "@/app/types/board.types";

import { Columns, COLUMNS_TITLES } from "../../constants/board.constants";
import { useColumns } from "../../hooks/useColumn";
import { Column } from "../column/Column";
import { TaskCard } from "../TaskCard";

export const Board = () => {
  const {
    backlogTasks,
    todoTasks,
    inProgressTasks,
    reviewTasks,
    doneTasks,
    backlogTasksLoading,
    todoTasksLoading,
    inProgressTasksLoading,
    reviewTasksLoading,
    doneTasksLoading,
    backlogTasksError,
    todoTasksError,
    inProgressTasksError,
    reviewTasksError,
    doneTasksError,
  } = useColumns();

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [overColumn, setOverColumn] = useState<Columns | null>(null);

  const { handleDragEnd, handleDragStart, handleDragOver, handleDragCancel } =
    useTaskDnd({
      setActiveTask,
      setOverIndex,
      setOverColumn,
    });

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
    >
      <div className="flex h-full w-full items-start gap-4 overflow-auto rounded-md bg-neutral-50 p-4 drop-shadow-sm">
        <Column
          column={Columns.BACKLOG}
          tasks={backlogTasks}
          title={COLUMNS_TITLES[Columns.BACKLOG]}
          taskCount={backlogTasks.length}
          loading={backlogTasksLoading}
          errored={backlogTasksError}
          overIndex={overIndex}
          overColumn={overColumn}
        />
        <Column
          column={Columns.TODO}
          tasks={todoTasks}
          title={COLUMNS_TITLES[Columns.TODO]}
          taskCount={todoTasks.length}
          loading={todoTasksLoading}
          errored={todoTasksError}
          overIndex={overIndex}
          overColumn={overColumn}
        />
        <Column
          column={Columns.IN_PROGRESS}
          tasks={inProgressTasks}
          title={COLUMNS_TITLES[Columns.IN_PROGRESS]}
          taskCount={inProgressTasks.length}
          loading={inProgressTasksLoading}
          errored={inProgressTasksError}
          overIndex={overIndex}
          overColumn={overColumn}
        />
        <Column
          column={Columns.REVIEW}
          tasks={reviewTasks}
          title={COLUMNS_TITLES[Columns.REVIEW]}
          taskCount={reviewTasks.length}
          loading={reviewTasksLoading}
          errored={reviewTasksError}
          overIndex={overIndex}
          overColumn={overColumn}
        />
        <Column
          column={Columns.DONE}
          tasks={doneTasks}
          title={COLUMNS_TITLES[Columns.DONE]}
          taskCount={doneTasks.length}
          loading={doneTasksLoading}
          errored={doneTasksError}
          overIndex={overIndex}
          overColumn={overColumn}
        />
      </div>
      <DragOverlay>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            index={0}
            column={null}
            className="scale-105 shadow-2xl"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
