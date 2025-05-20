import { Box, Card } from "@mui/material";
import React from "react";
import SelectActionCard from "../components/Card";
import BasicTable from "../components/Table";

const Dashboard = ({ pathname }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        gap: 4,
      }}
    >
      <SelectActionCard />
      <BasicTable />
    </Box>
  );
};

export default Dashboard;
