export const TASKS_ENDPOINTS = {
  TASKS: "/tasks",
  TASK_BY_ID: (id: number | string) => `/tasks/${id}`,
} as const;
