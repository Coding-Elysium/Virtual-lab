import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";
import { endPoint } from "../helper/helper.jsx";
import SuccessModal from "./SuccessModal.jsx";

const StudentForm = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    lrn: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    gradeLevel: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${endPoint}/student/create`, form)
      .then((response) => {
        console.log("Status:", response.status); // HTTP status code
        console.log("Student added successfully:", response.data);

        if (response.status === 200 || response.status === 201) {
          setForm({
            lrn: "",
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            gradeLevel: "",
            password: "",
          });
          setOpen(true);
        } else {
          console.warn("Unexpected status code:", response.status);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 1500,
      }}
    >
      <Typography variant="h6">Student Information</Typography>

      <TextField
        label="LRN"
        name="lrn"
        value={form.lrn}
        onChange={handleChange}
        required
        fullWidth
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
          fullWidth
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <TextField
          label="Grade Level"
          name="gradeLevel"
          select
          value={form.gradeLevel}
          onChange={handleChange}
          required
          fullWidth
        >
          <MenuItem value="">Select Grade Level</MenuItem>
          <MenuItem value="Senior High School">Senior High School</MenuItem>
          <MenuItem value="High School">High School</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          label="Gender"
          name="gender"
          select
          value={form.gender}
          onChange={handleChange}
          required
          fullWidth
        >
          <MenuItem value="">Select Gender</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          fullWidth
        />
      </Box>
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <SuccessModal
        open={open}
        onClose={() => setOpen(false)}
        message="Student added successfully!"
      />
    </Box>
  );
};

export default StudentForm;
