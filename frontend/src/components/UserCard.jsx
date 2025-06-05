import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Box,
  useMediaQuery,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { endPoint } from "../helper/helper.jsx";

const UserCard = ({ user, onUserUpdate }) => {
  const { lrn, firstName, lastName, email, gender, gradeLevel } = user;

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isLoading, setIsLoading] = useState(false);

  const handleViewProfile = () => {
    navigate(`/studentProfile`);
    console.log("View Profile clicked");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`${endPoint}/student/update/${user._id}`, editedUser)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        setOpenEditModal(false);
        onUserUpdate(editedUser);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsLoading(true);
      axios
        .delete(`${endPoint}/student/delete/${user._id}`)
        .then((response) => {
          console.log("User deleted successfully:", response.data);
          onUserUpdate(user._id);
          setOpenEditModal(false);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: "none",
          border: "1px solid #ccc",
          width: "100%",
          maxWidth: 700,
          margin: "auto",
          p: 2,
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 100, height: 100, fontSize: 36 }}>
          {firstName ? firstName.charAt(0).toUpperCase() : "?"}
        </Avatar>

        <Box sx={{ flex: 1, width: "100%" }}>
          <CardContent sx={{ pb: 1 }}>
            <Typography variant="h6" align={isSmallScreen ? "center" : "left"}>
              {firstName} {lastName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              align={isSmallScreen ? "center" : "left"}
            >
              {email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>LRN:</strong> {lrn || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Gender:</strong> {gender || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Grade Level:</strong> {gradeLevel || "N/A"}
            </Typography>
          </CardContent>
          {isSmallScreen ? (
            <Stack spacing={1} mt={2}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleViewProfile}
              >
                View Profile
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => setOpenEditModal(true)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Stack>
          ) : (
            <CardActions sx={{ gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setOpenEditModal(true)}
                  sx={{ flex: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  sx={{ flex: 1 }}
                >
                  Delete
                </Button>
                <Button variant="outlined" onClick={handleViewProfile}>
                  View Profile
                </Button>
              </Box>
            </CardActions>
          )}
        </Box>
      </Card>

      {/* Edit Modal */}
      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="LRN"
              name="lrn"
              value={editedUser.lrn}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="First Name"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Last Name"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              value={editedUser.email}
              onChange={handleEditChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={editedUser.gender}
                label="Gender"
                onChange={handleEditChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="gradeLevel-label">Grade Level</InputLabel>
              <Select
                labelId="gradeLevel-label"
                name="gradeLevel"
                value={editedUser.gradeLevel}
                label="Grade Level"
                onChange={handleEditChange}
              >
                <MenuItem value="Junior High School">
                  Junior High School
                </MenuItem>
                <MenuItem value="Senior High School">
                  Senior High School
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress color="inherit" size={20} />
            }
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserCard;
