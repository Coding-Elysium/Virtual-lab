import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ModalComponent from "../components/ModalComponent";
import TableComponent from "../components/TableComponent";
import SearchInputComponent from "../components/SearchInputComponent";

const Accounts = ({ pathname }) => {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const columns = [
    { key: "name", label: "First Name" },
    { key: "coc1", label: "Last Name" },
    { key: "coc2", label: "Email" },
    { key: "coc3", label: "Grade Level" },
    { key: "status", label: "Status", colorStatus: true },
    { key: "action", label: "Action" },
  ];

  const data = [
    {
      name: "John Carlo",
      coc1: "Passed",
      coc2: "Failed",
      coc3: "Passed",
      status: "Accepted",
    },
    {
      name: "Jasd Carlo",
      coc1: "Failed",
      coc2: "Failed",
      coc3: "Passed",
      status: "Rejected",
    },
    {
      name: "Jasd Carlo",
      coc1: "Failed",
      coc2: "Failed",
      coc3: "Passed",
      status: "Accepted",
    },
    {
      name: "Jasd Carlo",
      coc1: "Failed",
      coc2: "Failed",
      coc3: "Passed",
      status: "Accepted",
    },
    {
      name: "asdsadsad Carlo",
      coc1: "Failed",
      coc2: "Failed",
      coc3: "Passed",
      status: "Accepted",
    },
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

        <Button
          onClick={handleOpenModal}
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Student
        </Button>
      </Box>

      <TableComponent
        rows={data}
        columns={columns}
        searchQuery={query}
        hasCheckbox={true}
        hasAction={true}
        actionLabel="View Details"
        onBulkAction={(selected) => {
          console.log("Selected rows: ", selected);
          alert("You selected " + selected.length + " rows.");
        }}
      />

      <ModalComponent open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default Accounts;
