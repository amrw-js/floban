import { Columns } from "../constants/board.constants";
import { useGetColumnTasksQuery } from "../lib/apis/board.api";
import { selectTasksByColumn } from "../lib/selectors/board.selectors";
import { useAppSelector } from "../lib/store";

export const useColumns = () => {
  const { isLoading: backlogTasksLoading, isError: backlogTasksError } =
    useGetColumnTasksQuery(Columns.BACKLOG);

  const { isLoading: todoTasksLoading, isError: todoTasksError } =
    useGetColumnTasksQuery(Columns.TODO);

  const { isLoading: inProgressTasksLoading, isError: inProgressTasksError } =
    useGetColumnTasksQuery(Columns.IN_PROGRESS);

  const { isLoading: reviewTasksLoading, isError: reviewTasksError } =
    useGetColumnTasksQuery(Columns.REVIEW);

  const { isLoading: doneTasksLoading, isError: doneTasksError } =
    useGetColumnTasksQuery(Columns.DONE);

  const backlogTasks = useAppSelector(selectTasksByColumn(Columns.BACKLOG));
  const todoTasks = useAppSelector(selectTasksByColumn(Columns.TODO));
  const inProgressTasks = useAppSelector(
    selectTasksByColumn(Columns.IN_PROGRESS)
  );
  const reviewTasks = useAppSelector(selectTasksByColumn(Columns.REVIEW));
  const doneTasks = useAppSelector(selectTasksByColumn(Columns.DONE));

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
