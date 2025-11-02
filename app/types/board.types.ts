import { Columns } from "../constants/board.constants";

export type Task = {
  id: string | number;
  title: string;
  description?: string;
  column: Columns;
  order: number;
};
