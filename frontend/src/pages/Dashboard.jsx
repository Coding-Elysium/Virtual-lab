import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import SelectActionCard from "../components/Card";
import BasicTable from "../components/Table";
import TypeSearch from "../components/SearchInput";

const Dashboard = ({ pathname }) => {
  const [query, setQuery] = useState("");

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
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TypeSearch
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search students..."
            sx={{ width: "100%", maxWidth: 400 }}
          />
        </Box>

        <Button variant="contained" sx={{ whiteSpace: "nowrap" }}>
          Add Student
        </Button>
      </Box>

      <BasicTable searchQuery={query} />
    </Box>
  );
};

export default Dashboard;
