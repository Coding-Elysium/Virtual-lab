import React from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import StudentForm from "../components/StudentForm";

const AddStudent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        gap: 4,
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
