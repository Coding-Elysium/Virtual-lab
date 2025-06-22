import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import {
  Box,
  Breadcrumbs,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { endPoint } from "../helper/helper.jsx";

const StudentRecords = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get(`${endPoint}/student/read/approved`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const handleUserUpdate = (updatedOrDeletedUser) => {
    if (!updatedOrDeletedUser) return;

    if (typeof updatedOrDeletedUser === "string") {
      setUsers((prev) => prev.filter((u) => u._id !== updatedOrDeletedUser));
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === updatedOrDeletedUser._id ? updatedOrDeletedUser : u
        )
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.lrn.includes(searchTerm)
    );
  });

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
        <Typography color="text.primary">Student Records</Typography>
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
      {isSmallScreen ? (
        <Grid>
          {filteredUsers.map((user) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={user._id}
              sx={isSmallScreen ? { mb: 2 } : {}}
            >
              <UserCard user={user} onUserUpdate={handleUserUpdate} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={isSmallScreen ? 0 : 2}>
          {filteredUsers.map((user) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={user._id}
              sx={isSmallScreen ? { mb: 2 } : {}}
            >
              <UserCard user={user} onUserUpdate={handleUserUpdate} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StudentRecords;
