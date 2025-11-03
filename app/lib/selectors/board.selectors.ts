import { Columns } from "@/app/constants/board.constants";
import { SLICES } from "@/app/constants/store.constants";
import { TasksState } from "@/app/types/slices.types";

import { RootState } from "../store";
import { selectTaskSearchQuery } from "./filters.selectors";

export const selectBoardSlice = (state: RootState): TasksState =>
  state[SLICES.BOARD];

export const selectBoard = (state: RootState) => {
  const board = selectBoardSlice(state).board;
  const searchQuery = selectTaskSearchQuery(state);

  if (!searchQuery.trim()) {
    return board;
  }

  const query = searchQuery.toLowerCase();

  return Object.entries(board).reduce(
    (filtered, [column, tasks]) => {
      filtered[column as Columns] = tasks.filter(
        (task) =>
          task.title?.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      );
      return filtered;
    },
    {} as typeof board
  );
};

export const selectTasksByColumn = (column: Columns) => (state: RootState) =>
  selectBoard(state)[column];

export const selectCurrentTask = (state: RootState) =>
  selectBoardSlice(state).currentTask;

export const selectTaskById =
  (id: string | number | null) => (state: RootState) => {
    const board = selectBoard(state);

    if (!id) return null;

    return Object.values(board)
      .flat()
      .find((task) => task.id === id);
  };
