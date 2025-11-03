"use client";

import { ChangeEvent } from "react";

import ClearIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { selectTaskSearchQuery } from "../lib/selectors/filters.selectors";
import {
  clearTaskSearchQuery,
  setTaskSearchQuery,
} from "../lib/slices/filters.slice";
import { useAppDispatch, useAppSelector } from "../lib/store";

export const Navbar = () => {
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector(selectTaskSearchQuery);

  const handleClearSearchQuery = () => {
    dispatch(clearTaskSearchQuery());
  };

  const handleChangeSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTaskSearchQuery(event.target.value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FloBan
          </Typography>

          <TextField
            size="small"
            placeholder="Search…"
            variant="outlined"
            value={searchQuery}
            onChange={handleChangeSearchQuery}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearSearchQuery}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              minWidth: 400,
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
