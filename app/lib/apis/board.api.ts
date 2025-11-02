import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Columns } from "@/app/constants/board.constants";
import { BOARD_ENDPOINTS } from "@/app/constants/endpoints.constants";
import { REDUCER_PATHS } from "@/app/constants/store.constants";
import { getApiUrl } from "@/app/helpers/getApiUrl";
import { Task } from "@/app/types/board.types";

export const boardApi = createApi({
  reducerPath: REDUCER_PATHS.BOARD_API,
  tagTypes: ["board"],
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrl(),
  }),
  endpoints: (builder) => ({
    getBoard: builder.query<Task[], void>({
      query: () => `${BOARD_ENDPOINTS.TASKS}?_sort=order&_order=asc`,
      providesTags: ["board"],
    }),
    getTaskById: builder.query<Task, number | string>({
      query: (id) => BOARD_ENDPOINTS.TASK_BY_ID(id),
      providesTags: ["board"],
    }),
    getColumnTasks: builder.query<Task[], Columns>({
      query: (column) =>
        `${BOARD_ENDPOINTS.COLUMN_TASKS(column)}&_sort=order&_order=asc`,
      providesTags: ["board"],
    }),
    createTask: builder.mutation<Task, Omit<Task, "id">>({
      query: (task) => ({
        url: BOARD_ENDPOINTS.TASKS,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["board"],
    }),
    updateTask: builder.mutation<
      Task,
      { id: number | string; task: Partial<Task> }
    >({
      query: ({ id, task }) => ({
        url: BOARD_ENDPOINTS.TASK_BY_ID(id),
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["board"],
    }),
    moveTask: builder.mutation<
      Task,
      { taskId: string; newColumn: Columns; newOrder: number }
    >({
      query: ({ taskId, newColumn, newOrder }) => ({
        url: BOARD_ENDPOINTS.TASK_BY_ID(taskId),
        method: "PATCH",
        body: {
          column: newColumn,
          order: newOrder,
        },
      }),
      invalidatesTags: ["board"],
    }),
    deleteTask: builder.mutation<void, number | string>({
      query: (id) => ({
        url: BOARD_ENDPOINTS.TASK_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: ["board"],
    }),
  }),
});

export const {
  useGetBoardQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useMoveTaskMutation,
  useDeleteTaskMutation,
  useGetColumnTasksQuery,
} = boardApi;
