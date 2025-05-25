import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";

function createData(name, coc1, coc2, coc3) {
  return { name, coc1, coc2, coc3 };
}

const allRows = [
  createData("John Carlo", "Passed", "Failed", "Passed"),
  createData("Jasd Carlo", "Failed", "Failed", "Passed"),
  createData("John Carlo", "Pending", "Failed", "Passed"),
  createData("John Carlo", "Passed", "Failed", "Passed"),
  createData("John Carlo", "Passed", "Failed", "Passed"),
  createData("John Carlo", "Passed", "Failed", "Passed"),
  createData("John Carlo", "Failed", "Passed", "Passed"),
  createData("John Carlo", "Passed", "Passed", "Passed"),
  createData("John Carlo", "Pending", "Failed", "Passed"),
  createData("John Carlo", "Passed", "Passed", "Passed"),
  createData("John Carlo", "Passed", "Failed", "Failed"),
  createData("asjkdhjkashdrlo", "Passed", "Passed", "Passed"),
];

export default function TableComponent({ searchQuery = "" }) {
  const [visibleRows, setVisibleRows] = useState(allRows.slice(0, 10));
  const [loading, setLoading] = React.useState(false);
  const [index, setIndex] = React.useState(10);

  const rowsPerPage = 10;

  const filteredRows = allRows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setVisibleRows(filteredRows.slice(0, rowsPerPage));
    setIndex(rowsPerPage);
  }, [searchQuery]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleRows((prev) => [
        ...prev,
        ...filteredRows.slice(index, index + rowsPerPage),
      ]);
      setIndex((prev) => prev + rowsPerPage);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) =>
    status === "Passed" ? "green" : status === "Pending" ? "gray" : "red";

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#1976d2",
                }}
              >
                Students
              </TableCell>
              <TableCell align="right">COC 1</TableCell>
              <TableCell align="right">COC 2</TableCell>
              <TableCell align="right">COC 3</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: getStatusColor(row.coc1) }}
                >
                  {row.coc1}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: getStatusColor(row.coc2) }}
                >
                  {row.coc2}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: getStatusColor(row.coc3) }}
                >
                  {row.coc3}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => alert("Output View")}
                  >
                    View Output
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Loading spinner or Load More */}
      <Box mt={2} display="flex" justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : (
          index < allRows.length && (
            <Button variant="outlined" onClick={loadMore}>
              Load More
            </Button>
          )
        )}
      </Box>
    </>
  );
}
