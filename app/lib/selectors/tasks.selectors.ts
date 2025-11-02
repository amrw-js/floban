import { SLICES } from "@/app/constants/store.constants";
import { Columns } from "@/app/constants/tasks.constants";
import { Task } from "@/app/types/tasks.types";

import { RootState } from "../store";

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
}

export const selectTasksSlice = (state: RootState): TasksState =>
  state[SLICES.TASKS];

export const selectTasks = (state: RootState) => selectTasksSlice(state).tasks;

export const selectCurrentTask = (state: RootState) =>
  selectTasksSlice(state).currentTask;

export const selectTasksByColumn = (column: Columns) => (state: RootState) =>
  selectTasks(state).filter((task) => task.column === column);

export const selectTaskById = (id: number | string) => (state: RootState) =>
  selectTasks(state).find((task) => task.id === id);

export const selectTaskCounts = (state: RootState) => {
  const tasks = selectTasks(state);
  return {
    [Columns.BACKLOG]: tasks.filter((t) => t.column === Columns.BACKLOG).length,
    [Columns.TODO]: tasks.filter((t) => t.column === Columns.TODO).length,
    [Columns.IN_PROGRESS]: tasks.filter((t) => t.column === Columns.IN_PROGRESS)
      .length,
    [Columns.REVIEW]: tasks.filter((t) => t.column === Columns.REVIEW).length,
    [Columns.DONE]: tasks.filter((t) => t.column === Columns.DONE).length,
  };
};
