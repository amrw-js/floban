import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TASKS_ENDPOINTS } from "@/app/constants/endpoints.constants";
import { REDUCER_PATHS } from "@/app/constants/store.constants";
import { Columns } from "@/app/constants/tasks.constants";
import { getApiUrl } from "@/app/helpers/getApiUrl";
import { Task } from "@/app/types/tasks.types";

export const tasksApi = createApi({
  reducerPath: REDUCER_PATHS.TASKS_API,
  tagTypes: ["tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrl(),
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => TASKS_ENDPOINTS.TASKS,
      providesTags: ["tasks"],
    }),
    getTaskById: builder.query<Task, number | string>({
      query: (id) => TASKS_ENDPOINTS.TASK_BY_ID(id),
      providesTags: ["tasks"],
    }),
    getColumnTasks: builder.query<Task[], Columns>({
      query: (column) => TASKS_ENDPOINTS.COLUMN_TASKS(column),
      providesTags: ["tasks"],
    }),
    createTask: builder.mutation<Task, Omit<Task, "id">>({
      query: (task) => ({
        url: TASKS_ENDPOINTS.TASKS,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["tasks"],
    }),
    updateTask: builder.mutation<
      Task,
      { id: number | string; task: Partial<Task> }
    >({
      query: ({ id, task }) => ({
        url: TASKS_ENDPOINTS.TASK_BY_ID(id),
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["tasks"],
    }),
    deleteTask: builder.mutation<void, number | string>({
      query: (id) => ({
        url: TASKS_ENDPOINTS.TASK_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetColumnTasksQuery,
} = tasksApi;
