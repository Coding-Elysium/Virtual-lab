import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GradeIcon from "@mui/icons-material/Grade";

const StudentProfile = () => {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const cocRecords = [
    {
      coc: "COC 1",
      reviewStatus: "Completed",
      result: "Passed",
      date: "2025-03-12",
    },
    {
      coc: "COC 2",
      reviewStatus: "Completed",
      result: "Passed",
      date: "2025-03-15",
    },
    {
      coc: "COC 3",
      reviewStatus: "Pending",
      result: "Failed",
      date: "2025-03-20",
    },
  ];

  const handleView = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecord(null);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      {/* Profile Header */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
          background: "linear-gradient(135deg, #f3f4f6, #e0f7fa)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src="https://i.pravatar.cc/150?img=8"
              alt="John Doe"
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight={600}>
              John Doe
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography color="text.secondary">
                  john.doe@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <FingerprintIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography color="text.secondary">LRN: 123456789</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography color="text.secondary">Gender: Male</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <GradeIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography color="text.secondary">Grade Level: 12</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* COC Records */}
      <Typography variant="h5" gutterBottom fontWeight={600}>
        COC Records
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>COC</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Review Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Result</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date Taken</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cocRecords.map((record, index) => (
              <TableRow key={index} hover>
                <TableCell>{record.coc}</TableCell>
                <TableCell>
                  <Chip
                    label={record.reviewStatus}
                    color={
                      record.reviewStatus === "Completed"
                        ? "success"
                        : "warning"
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.result}
                    color={record.result === "Passed" ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleView(record)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog for COC Details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedRecord?.coc} Details</DialogTitle>
        <DialogContent dividers>
          <Typography>
            <strong>Review Status:</strong> {selectedRecord?.reviewStatus}
          </Typography>
          <Typography>
            <strong>Result:</strong> {selectedRecord?.result}
          </Typography>
          <Typography>
            <strong>Date Taken:</strong>{" "}
            {selectedRecord
              ? new Date(selectedRecord.date).toLocaleDateString()
              : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentProfile;
