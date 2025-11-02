import { createSlice } from "@reduxjs/toolkit";

import { Columns } from "@/app/constants/board.constants";
import { SLICES } from "@/app/constants/store.constants";
import { Task } from "@/app/types/board.types";

import { boardApi } from "../apis/board.api";

export interface TasksState {
  board: Record<Columns, Task[]>;
  currentTask: Task | null;
}

const initialState: TasksState = {
  board: {
    [Columns.BACKLOG]: [],
    [Columns.TODO]: [],
    [Columns.IN_PROGRESS]: [],
    [Columns.REVIEW]: [],
    [Columns.DONE]: [],
  },
  currentTask: null,
};

export const boardSlice = createSlice({
  name: SLICES.BOARD,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      boardApi.endpoints.getColumnTasks.matchFulfilled,
      (state, action) => {
        const column = action.meta.arg.originalArgs;
        state.board[column] = action.payload;
      }
    );

    builder.addMatcher(
      boardApi.endpoints.getBoard.matchFulfilled,
      (state, action) => {
        const newBoard: Record<Columns, Task[]> = {
          [Columns.BACKLOG]: [],
          [Columns.TODO]: [],
          [Columns.IN_PROGRESS]: [],
          [Columns.REVIEW]: [],
          [Columns.DONE]: [],
        };

        action.payload.forEach((task) => {
          newBoard[task.column].push(task);
        });
        state.board = newBoard;
      }
    );

    builder.addMatcher(
      boardApi.endpoints.getTaskById.matchFulfilled,
      (state, action) => {
        state.currentTask = action.payload;
      }
    );

    builder.addMatcher(
      boardApi.endpoints.createTask.matchFulfilled,
      (state, action) => {
        const column = action.payload.column;
        state.board[column].push(action.payload);
        state.currentTask = action.payload;
      }
    );

    builder.addMatcher(
      boardApi.endpoints.updateTask.matchFulfilled,
      (state, action) => {
        const updated = action.payload;
        const oldColumn = Object.keys(state.board).find((col) =>
          state.board[col as Columns].some((t) => t.id === updated.id)
        ) as Columns | undefined;

        if (oldColumn) {
          state.board[oldColumn] = state.board[oldColumn].filter(
            (t) => t.id !== updated.id
          );
        }

        state.board[updated.column].push(updated);
        state.currentTask = updated;
      }
    );

    builder.addMatcher(
      boardApi.endpoints.deleteTask.matchFulfilled,
      (state, action) => {
        const taskId = action.meta.arg.originalArgs;
        for (const col of Object.values(Columns)) {
          state.board[col] = state.board[col].filter((t) => t.id !== taskId);
        }
        if (state.currentTask?.id === taskId) {
          state.currentTask = null;
        }
      }
    );
  },
});

export default boardSlice.reducer;
