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
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "gradeLevel", label: "Grade Level" },
    { key: "accepted", label: "Action" },
  ];

  const data = [
    {
      name: "John Carlo",
      lastName: "Abanes",
      email: "johnc@example.com",
      gradeLevel: "10",
    },
    {
      name: "John Carlo",
      lastName: "Abanes",
      email: "johnc@example.com",
      gradeLevel: "10",
    },
    {
      name: "John Carlo",
      lastName: "Abanes",
      email: "johnc@example.com",
      gradeLevel: "10",
    },
    {
      name: "John Carlo",
      lastName: "Abanes",
      email: "johnc@example.com",
      gradeLevel: "10",
    },
    {
      name: "John Carlo",
      lastName: "Abanes",
      email: "johnc@example.com",
      gradeLevel: "10",
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
        hasCheckbox={false}
        hasAction={true}
        actionLabel="View Details"
      />

      <ModalComponent open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default Accounts;
