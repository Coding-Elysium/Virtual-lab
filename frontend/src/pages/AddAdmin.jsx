import { Box, Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import AdminForm from "../components/AdminForm";

const AddAdmin = () => {
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
        <Typography color="text.secondary">Admin</Typography>
        <Typography color="text.primary">Add Admin</Typography>
      </Breadcrumbs>

      <AdminForm />
    </Box>
  );
};

export default AddAdmin;
