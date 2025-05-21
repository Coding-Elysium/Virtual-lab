import React, { useState } from "react";
import UserCardStyled from "../components/UserCard";
import { Box, Button } from "@mui/material";
import BasicModal from "../components/Modal";
import BasicTable from "../components/Table";
import TypeSearch from "../components/SearchInput";

const Students = ({ pathname }) => {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
          <TypeSearch
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

      <BasicTable searchQuery={query} />

      <BasicModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default Students;
