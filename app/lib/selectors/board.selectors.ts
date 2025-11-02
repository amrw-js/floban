import { Columns } from "@/app/constants/board.constants";
import { SLICES } from "@/app/constants/store.constants";

import { TasksState } from "../slices/board.slice";
import { RootState } from "../store";

export const selectBoardSlice = (state: RootState): TasksState =>
  state[SLICES.BOARD];

export const selectBoard = (state: RootState) => selectBoardSlice(state).board;

export const selectTasksByColumn = (column: Columns) => (state: RootState) =>
  selectBoard(state)[column];

export const selectCurrentTask = (state: RootState) =>
  selectBoardSlice(state).currentTask;

export const selectTaskById = (id: string | number) => (state: RootState) => {
  const board = selectBoard(state);

  return Object.values(board)
    .flat()
    .find((task) => task.id === id);
};
