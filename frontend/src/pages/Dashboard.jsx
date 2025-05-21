import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import SelectActionCard from "../components/Card";
import BasicTable from "../components/Table";
import TypeSearch from "../components/SearchInput";
import BasicModal from "../components/Modal";
import BasicBars from "../components/BarGraph";

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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 4,
          width: "100%",
        }}
      >
        <BasicBars />
        <BasicBars />
      </Box>
    </Box>
  );
};

export default Dashboard;
