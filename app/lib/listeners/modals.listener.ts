import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { Task } from "@/app/types/board.types";

import { boardApi } from "../apis/board.api";
import { setCreateTaskFor, setPreviewedTaskId } from "../slices/modals.slice";

export const modalsListener = createListenerMiddleware();

modalsListener.startListening({
  matcher: isAnyOf(boardApi.endpoints.createTask.matchFulfilled),
  effect: async (action, listenerApi) => {
    const newTask = action.payload as Task;

    listenerApi.dispatch(setPreviewedTaskId(newTask.id));
    listenerApi.dispatch(setCreateTaskFor(null));
  },
});
