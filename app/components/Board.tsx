"use client";

import { Columns, COLUMNS_TITLES } from "../constants/tasks.constants";
import { useColumns } from "../hooks/useColumn";
import { Column } from "./column/Column";

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

  return (
    <div className="flex h-full w-full items-start gap-4 overflow-auto rounded-md bg-neutral-50 p-4 drop-shadow-sm">
      <Column
        tasks={backlogTasks}
        title={COLUMNS_TITLES[Columns.BACKLOG]}
        taskCount={backlogTasks.length}
        loading={backlogTasksLoading}
        errored={backlogTasksError}
      />
      <Column
        tasks={todoTasks}
        title={COLUMNS_TITLES[Columns.TODO]}
        taskCount={todoTasks.length}
        loading={todoTasksLoading}
        errored={todoTasksError}
      />
      <Column
        tasks={inProgressTasks}
        title={COLUMNS_TITLES[Columns.IN_PROGRESS]}
        taskCount={inProgressTasks.length}
        loading={inProgressTasksLoading}
        errored={inProgressTasksError}
      />
      <Column
        tasks={reviewTasks}
        title={COLUMNS_TITLES[Columns.REVIEW]}
        taskCount={reviewTasks.length}
        loading={reviewTasksLoading}
        errored={reviewTasksError}
      />
      <Column
        tasks={doneTasks}
        title={COLUMNS_TITLES[Columns.DONE]}
        taskCount={doneTasks.length}
        loading={doneTasksLoading}
        errored={doneTasksError}
      />
    </div>
  );
};
