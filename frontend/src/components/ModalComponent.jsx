import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: 400,
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: {
    xs: 2,
    sm: 4,
  },
  borderRadius: 2,
};

export default function ModalComponent({ open, onClose }) {
  const [form, setForm] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    gradeLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-form-title"
      aria-describedby="modal-form-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-form-title" variant="h6" component="h2" mb={2}>
          Student Information
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Middle Name"
            name="middleName"
            value={form.middleName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="gradeLevel-label">Grade Level</InputLabel>
            <Select
              labelId="gradeLevel-label"
              id="gradeLevel"
              name="gradeLevel"
              value={form.gradeLevel}
              onChange={handleChange}
              label="Grade Level"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Grade 10">Grade 10</MenuItem>
              <MenuItem value="Grade 11">Grade 11</MenuItem>
              <MenuItem value="Grade 12">Grade 12</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
