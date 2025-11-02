export const TASKS_ENDPOINTS = {
  TASKS: "/tasks",
  TASK_BY_ID: (id: number | string) => `/tasks/${id}`,
  COLUMN_TASKS: (column: string) => `/tasks?column=${column}`,
} as const;
