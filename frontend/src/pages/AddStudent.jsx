import React from "react";
import {
  Box,
  Breadcrumbs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StudentForm from "../components/StudentForm";

const AddStudent = () => {
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
        pt: 4,
      }}
    >
      <Breadcrumbs>
        <Typography color="text.secondary">Student</Typography>
        <Typography color="text.primary">Add Student</Typography>
      </Breadcrumbs>

      <StudentForm />
    </Box>
  );
};

export default AddStudent;
