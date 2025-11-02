import { Columns } from "../constants/tasks.constants";
import { useGetColumnTasksQuery } from "../lib/apis/tasks.api";

export const useColumns = () => {
  const {
    data: backlogTasks = [],
    isLoading: backlogTasksLoading,
    isError: backlogTasksError,
  } = useGetColumnTasksQuery(Columns.BACKLOG);

  const {
    data: todoTasks = [],
    isLoading: todoTasksLoading,
    isError: todoTasksError,
  } = useGetColumnTasksQuery(Columns.TODO);

  const {
    data: inProgressTasks = [],
    isLoading: inProgressTasksLoading,
    isError: inProgressTasksError,
  } = useGetColumnTasksQuery(Columns.IN_PROGRESS);

  const {
    data: reviewTasks = [],
    isLoading: reviewTasksLoading,
    isError: reviewTasksError,
  } = useGetColumnTasksQuery(Columns.REVIEW);

  const {
    data: doneTasks = [],
    isLoading: doneTasksLoading,
    isError: doneTasksError,
  } = useGetColumnTasksQuery(Columns.DONE);

  return {
    backlogTasks,
    todoTasks,
    inProgressTasks,
    reviewTasks,
    doneTasks,
    backlogTasksLoading,
    todoTasksLoading,
    inProgressTasksLoading,
    reviewTasksLoading,
    doneTasksLoading,
    backlogTasksError,
    todoTasksError,
    inProgressTasksError,
    reviewTasksError,
    doneTasksError,
  };
};
