import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";

export default function BasicBars() {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        width: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Grade 10
      </Typography>

      <BarChart
        xAxis={[{ data: ["COC 1", "COC 2", "COC 3"] }]}
        series={[
          { data: [4, 3, 5], label: "Pending", color: "#FFA726" },
          { data: [1, 6, 3], label: "Passed", color: "#66BB6A" }, // green
          { data: [2, 5, 10], label: "Failed", color: "#EF5350" }, // red
        ]}
        height={300}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}
