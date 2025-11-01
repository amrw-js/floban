import { Columns } from "../constants/tasks.constants";

export type Task = {
  id: string | number;
  title: string;
  description?: string;
  column: Columns;
};
