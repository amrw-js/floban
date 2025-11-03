"use client";

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/app/lib/apis/board.api";
import {
  selectCreateTaskFor,
  selectPreviewedTaskId,
} from "@/app/lib/selectors/modals.selectors";
import {
  setCreateTaskFor,
  setPreviewedTaskId,
} from "@/app/lib/slices/modals.slice";
import { useAppDispatch, useAppSelector } from "@/app/lib/store";
import { Task } from "@/app/types/board.types";

import { TaskModalContainer } from "./TaskModalContainer";

export const TaskModal = () => {
  const dispatch = useAppDispatch();
  const previewedTaskId = useAppSelector(selectPreviewedTaskId);
  const createTaskFor = useAppSelector(selectCreateTaskFor);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [createTask] = useCreateTaskMutation();

  const handleClose = () => {
    dispatch(setPreviewedTaskId(null));
    dispatch(setCreateTaskFor(null));
  };

  const handleSave = (task: Task) => {
    updateTask({ id: task.id, task });
  };

  const handleDelete = (taskId: string | number) => {
    deleteTask(taskId);
    handleClose();
  };

  const onCreateNewTask = (newTask: Task) => {
    createTask(newTask);
    dispatch(setCreateTaskFor(null));
  };

  return (
    <>
      <TaskModalContainer
        open={!!previewedTaskId}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <TaskModalContainer
        defaultMode="edit"
        open={!!createTaskFor}
        defaultColumn={createTaskFor}
        onClose={handleClose}
        onSave={onCreateNewTask}
        onDelete={handleClose}
      />
    </>
  );
};
