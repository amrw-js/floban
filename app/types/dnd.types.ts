import { Columns } from "../constants/tasks.constants";

export type DragItem = {
  id: string;
  column: Columns;
  index: number;
};

export type DropResult = {
  sourceColumn: Columns;
  destinationColumn: Columns;
  taskId: string;
  sourceIndex: number;
  destinationIndex: number;
};
