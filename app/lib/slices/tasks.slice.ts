import { createSlice } from "@reduxjs/toolkit";

import { SLICES } from "@/app/constants/store.constants";
import { Task } from "@/app/types/tasks.types";

import { tasksApi } from "../apis/tasks.api";

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
}

const initialState: TasksState = {
  tasks: [],
  currentTask: null,
};

export const tasksSlice = createSlice({
  name: SLICES.TASKS,
  initialState,
  reducers: {
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    // Get all tasks
    builder.addMatcher(
      tasksApi.endpoints.getTasks.matchFulfilled,
      (state, action) => {
        state.tasks = action.payload;
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.getTaskById.matchFulfilled,
      (state, action) => {
        state.currentTask = action.payload;
      }
    );

    // Create task
    builder.addMatcher(
      tasksApi.endpoints.createTask.matchFulfilled,
      (state, action) => {
        state.tasks.push(action.payload);
        state.currentTask = action.payload;
      }
    );

    // Update task
    builder.addMatcher(
      tasksApi.endpoints.updateTask.matchFulfilled,
      (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.currentTask = action.payload;
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.deleteTask.matchFulfilled,
      (state, action) => {
        state.tasks = state.tasks.filter(
          (t) => t.id !== action.meta.arg.originalArgs
        );
        if (state.currentTask?.id === action.meta.arg.originalArgs) {
          state.currentTask = null;
        }
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.getTasksByColumn.matchFulfilled,
      (state, action) => {
        state.tasks = action.payload;
      }
    );
  },
});

export const { clearCurrentTask } = tasksSlice.actions;
export default tasksSlice.reducer;
