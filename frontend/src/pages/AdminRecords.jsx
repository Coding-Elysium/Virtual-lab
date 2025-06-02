import { Box, Breadcrumbs, Typography } from "@mui/material";
import React from "react";

const AdminRecords = () => {
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
        <Typography color="text.primary">Admin Records</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default AdminRecords;
