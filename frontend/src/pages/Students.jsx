import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ModalComponent from "../components/ModalComponent";
import TableComponent from "../components/TableComponent";
import SearchInputComponent from "../components/SearchInputComponent";

const Students = ({ pathname }) => {
  const [query, setQuery] = useState("");

  const columns = [
    { key: "name", label: "Students" },
    { key: "coc1", label: "COC 1", colorStatus: true },
    { key: "coc2", label: "COC 2", colorStatus: true },
    { key: "coc3", label: "COC 3", colorStatus: true },
    { key: "action", label: "Action", colorStatus: true },
  ];

  const data = [
    { name: "John Carlo", coc1: "Passed", coc2: "Failed", coc3: "Passed" },
    { name: "Jasd Carlo", coc1: "Failed", coc2: "Failed", coc3: "Passed" },
    { name: "asdsadsad Carlo", coc1: "Failed", coc2: "Failed", coc3: "Passed" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        gap: 4,
      }}
    >
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
          <SearchInputComponent
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search students..."
            sx={{ width: "100%", maxWidth: 400 }}
          />
        </Box>
      </Box>

      <TableComponent
        rows={data}
        columns={columns}
        searchQuery={query}
        hasCheckbox={false}
        hasAction={true}
        actionLabel="View Student Record"
        onBulkAction={(selected) => {
          console.log("Selected rows: ", selected);
          alert("You selected " + selected.length + " rows.");
        }}
      />
    </Box>
  );
};

export default Students;
