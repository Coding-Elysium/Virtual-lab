import {
  Box,
  Breadcrumbs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import TableWithAction from "../components/TableWithAction";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const StudentReview = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        gap: 4,
        pl: isSmallScreen ? 0 : 6,
        pr: isSmallScreen ? 0 : 6,
      }}
    >
      <Breadcrumbs>
        <Typography color="text.secondary">Student</Typography>
        <Typography color="text.primary">Student Review</Typography>
      </Breadcrumbs>

      <Box sx={{ maxWidth: { xs: "100%", sm: 300 }, width: "100%" }}>
        <TextField
          label="Search Student"
          variant="outlined"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableWithAction searchTerm={searchTerm} />
    </Box>
  );
};

export default StudentReview;
