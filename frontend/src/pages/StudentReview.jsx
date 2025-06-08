import {
  Box,
  Breadcrumbs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import TableWithAction from "../components/TableWithAction";
import { endPoint } from "../helper/helper.jsx";

const StudentReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentReviews, setStudentReviews] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get(`${endPoint}/student/read/pending`)
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        setStudentReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAcceptStudent = (id) => {
    setStudentReviews((prev) => prev.filter((student) => student._id !== id));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        gap: 4,
        pl: isSmallScreen ? 0 : 6,
        pr: isSmallScreen ? 0 : 6,
        pt: 4,
      }}
    >
      <Breadcrumbs>
        <Typography color="text.secondary">Student</Typography>
        <Typography color="text.primary">Student Review</Typography>
      </Breadcrumbs>

      <Box sx={{ maxWidth: { xs: "100%", sm: 300 }, width: "100%" }}>
        <TextField
          label="Search Student"
          variant="outlined"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableWithAction
        searchTerm={searchTerm}
        data={studentReviews}
        onAccept={handleAcceptStudent}
      />
    </Box>
  );
};

export default StudentReview;
