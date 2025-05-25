import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * Props:
 * - value: string (controlled value)
 * - onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
 * - onClear: () => void
 * - placeholder: string
 * - sx: MUI style object
 */
const SearchInputComponent = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  sx = {},
}) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={sx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={onClear} edge="end">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInputComponent;
