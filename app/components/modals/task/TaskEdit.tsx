import { FC } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { Columns, COLUMNS_TITLES } from "@/app/constants/board.constants";

type TaskEditFormProps = {
  title: string;
  description: string;
  column: Columns;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: Columns) => void;
};

export const TaskEditForm: FC<TaskEditFormProps> = (props) => {
  const {
    title,
    description,
    column,
    onTitleChange,
    onDescriptionChange,
    onStatusChange,
  } = props;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <TextField
        label="Title"
        fullWidth
        required
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        variant="outlined"
      />

      <FormControl fullWidth variant="outlined">
        <InputLabel>Status</InputLabel>
        <Select
          value={column}
          onChange={(e) => onStatusChange(e.target.value as Columns)}
          label="Status"
        >
          {Object.values(Columns).map((key) => (
            <MenuItem key={key} value={key}>
              {COLUMNS_TITLES[key as Columns]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={6}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        variant="outlined"
        placeholder="Add a description..."
      />
    </Box>
  );
};
