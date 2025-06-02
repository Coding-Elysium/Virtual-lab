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

const fakeData = [
  {
    lrn: "2025001025001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    gender: "Male",
    gradeLevel: "Senior High",
  },
  {
    lrn: "2025001025002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    gender: "Female",
    gradeLevel: "Junior High",
  },
];

const TableWithAction = ({ searchTerm }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEdit = (row) => {
    console.log("Action clicked for:", row);
  };

  const filteredData = fakeData.filter((row) => {
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
                {row.firstName} {row.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                LRN: {row.lrn}
              </Typography>
            </CardContent>

            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                onClick={() => handleEdit(row)}
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>LRN</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Grade Level</TableCell>
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
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleEdit(row)}>
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
