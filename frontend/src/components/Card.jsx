import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SelectActionCard() {
  return (
    <Box
      sx={{
        width: "100%",
        gap: 2,
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <Typography variant="h5" component="div">
        40
      </Typography>
      <Typography variant="body2" color="text.secondary">
        All Students
      </Typography>
    </Box>
  );
}

export default SelectActionCard;
