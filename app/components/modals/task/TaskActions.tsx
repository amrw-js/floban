import { FC } from "react";

import { Button, DialogActions, Divider } from "@mui/material";

type TaskModalActionsProps = {
  onCancel: () => void;
  onSave: () => void;
  isSaveDisabled: boolean;
};

export const TaskModalActions: FC<TaskModalActionsProps> = (props) => {
  const { onCancel, onSave, isSaveDisabled } = props;

  return (
    <>
      <Divider />
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={isSaveDisabled}
        >
          Save Changes
        </Button>
      </DialogActions>
    </>
  );
};
