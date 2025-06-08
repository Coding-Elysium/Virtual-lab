import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DangerousIcon from "@mui/icons-material/Dangerous";
import axios from "axios";
import { endPoint } from "../helper/helper";

const TableWithAction = ({ searchTerm, data, onAccept }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
  };

  const handleAccept = (row) => {
    const update = { status: "accepted" };
    axios
      .put(`${endPoint}/student/accept/${row._id}`, update)
      .then(() => {
        onAccept(row._id);
      })
      .catch((error) => {
        console.error("Error accepting student:", error);
      });
  };

  const filteredData = data.filter((row) => {
    const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      row.lrn.includes(searchTerm)
    );
  });

  if (isSmallScreen) {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        {filteredData.map((row) => (
          <Card
            key={row.lrn}
            variant="outlined"
            sx={{
              p: 1,
              borderRadius: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ flex: 1, paddingRight: 2 }}>
              <Typography variant="h6" fontWeight="bold" noWrap>
                {row.firstName}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                LRN: {row.lrn}
              </Typography>
            </CardContent>

            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                onClick={() => handleAccept(row)}
                size="small"
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleEdit(row)}
                size="small"
              >
                <DangerousIcon />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table
        sx={{
          boxShadow: "none",
          minWidth: 650,
          "& th": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          },
          "& td": {
            borderBottom: "1px solid #e0e0e0",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>LRN</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Grade Level</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.lrn}>
              <TableCell>{row.lrn}</TableCell>
              <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.gradeLevel}</TableCell>
              <TableCell>{row.status || "pending"}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleAccept(row)}>
                  <CheckIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleEdit(row)}>
                  <DangerousIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWithAction;
