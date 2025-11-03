"use client";

import { FC, useEffect, useState } from "react";

import { Box, Dialog, DialogContent, Divider } from "@mui/material";

import { Columns } from "@/app/constants/board.constants";
import { selectTaskById } from "@/app/lib/selectors/board.selectors";
import { selectPreviewedTaskId } from "@/app/lib/selectors/modals.selectors";
import { useAppSelector } from "@/app/lib/store";
import { Task } from "@/app/types/board.types";

import { TaskModalActions } from "./TaskActions";
import { TaskEditForm } from "./TaskEdit";
import { TaskModalHeader } from "./TaskHeader";
import { TaskPreview } from "./TaskPreview";

type TaskModalContainerProps = {
  open: boolean;
  defaultMode?: "preview" | "edit";
  defaultColumn?: Columns | null;
  onClose: () => void;
  onSave?: (task: Task) => void;
  onDelete?: (taskId: string | number) => void;
};

export const TaskModalContainer: FC<TaskModalContainerProps> = (props) => {
  const {
    open,
    defaultMode = "preview",
    defaultColumn = Columns.TODO,
    onClose,
    onSave,
    onDelete,
  } = props;

  const previewedTaskId = useAppSelector(selectPreviewedTaskId);
  const previewedTask =
    useAppSelector(selectTaskById(previewedTaskId)) ?? ({} as Task);

  const [mode, setMode] = useState<"preview" | "edit">(defaultMode);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState<Columns>(defaultColumn ?? Columns.TODO);

  useEffect(() => {
    if (defaultColumn) setColumn(defaultColumn);
  }, [defaultColumn]);

  if (!open) return null;

  const reset = () => {
    setTitle("");
    setDescription("");
    setColumn(Columns.TODO);
    setMode(defaultMode);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleEdit = () => {
    setTitle(previewedTask.title);
    setDescription(previewedTask.description || "");
    setColumn(previewedTask.column);
    setMode("edit");
  };

  const handleSave = () => {
    if (onSave && title.trim()) {
      onSave({ ...previewedTask, title, description, column });
    }
    reset();
  };

  const handleDelete = () => {
    if (!onDelete) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      onDelete(previewedTask.id);
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <TaskModalHeader
        mode={mode}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClose={handleClose}
      />

      <Divider />

      <DialogContent>
        <Box py={2}>
          {mode === "preview" ? (
            <TaskPreview task={previewedTask} />
          ) : (
            <TaskEditForm
              title={title}
              description={description}
              column={column}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onStatusChange={setColumn}
            />
          )}
        </Box>
      </DialogContent>

      {mode === "edit" && (
        <TaskModalActions
          onCancel={handleClose}
          onSave={handleSave}
          isSaveDisabled={!title.trim()}
        />
      )}
    </Dialog>
  );
};
