import { FC } from "react";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, DialogTitle, IconButton } from "@mui/material";

type TaskModalHeaderProps = {
  mode: "preview" | "edit";
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};

export const TaskModalHeader: FC<TaskModalHeaderProps> = (props) => {
  const { mode, onEdit, onDelete, onClose } = props;

  return (
    <DialogTitle>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <span>{mode === "preview" ? "Task Details" : "Edit Task"}</span>
        <Box>
          {mode === "preview" && (
            <>
              <IconButton onClick={onEdit} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={onDelete} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </>
          )}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </DialogTitle>
  );
};
