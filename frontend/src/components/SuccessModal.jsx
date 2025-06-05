import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function SuccessModal({
  open,
  onClose,
  message = "Action completed successfully!",
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <Box sx={style}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
        <Typography
          id="success-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Success
        </Typography>
        <Typography id="success-modal-description" sx={{ mb: 3 }}>
          {message}
        </Typography>
        <Button variant="contained" onClick={onClose} color="success">
          OK
        </Button>
      </Box>
    </Modal>
  );
}
