import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

const StudentForm = () => {
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
    console.log("Form submitted:", form);
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

      {/* Row 1: LRN and First Name */}

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
    </Box>
  );
};

export default StudentForm;
