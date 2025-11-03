"use client";

import { useState } from "react";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useTaskDnd } from "@/app/hooks/useTaskDnd";
import {
  setCreateTaskFor,
  setPreviewedTaskId,
} from "@/app/lib/slices/modals.slice";
import { useAppDispatch } from "@/app/lib/store";
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

  const dispatch = useAppDispatch();

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [overColumn, setOverColumn] = useState<Columns | null>(null);

  const { handleDragEnd, handleDragStart, handleDragOver, handleDragCancel } =
    useTaskDnd({
      setActiveTask,
      setOverIndex,
      setOverColumn,
    });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.5,
      },
    })
  );

  const onTaskClick = (task: Task) => {
    dispatch(setPreviewedTaskId(task.id));
  };

  const onAddTaskClicked = (column: Columns) => {
    dispatch(setCreateTaskFor(column));
  };

  return (
    <DndContext
      sensors={sensors}
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
          onTaskClick={onTaskClick}
          onAddTask={onAddTaskClicked}
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
          onTaskClick={onTaskClick}
          onAddTask={onAddTaskClicked}
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
          onTaskClick={onTaskClick}
          onAddTask={onAddTaskClicked}
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
          onTaskClick={onTaskClick}
          onAddTask={onAddTaskClicked}
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
          onTaskClick={onTaskClick}
          onAddTask={onAddTaskClicked}
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
