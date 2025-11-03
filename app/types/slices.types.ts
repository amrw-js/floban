import { Columns } from "../constants/board.constants";
import { Task } from "./board.types";

export type ModalsSlices = {
  taskModalOpen: boolean;
  previewedTaskId: Task["id"] | null;
  createTaskFor: Columns | null;
};

export type TasksState = {
  board: Record<Columns, Task[]>;
  currentTask: Task | null;
};

export type MoveTaskPayload = {
  taskId: string;
  from: Columns;
  to: Columns;
  toIndex: number;
  newOrder: number;
};

export type FiltersSlices = {
  taskSearchQuery: string;
};
