import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";

const rowsPerPage = 10;

export default function TableComponent({
  rows = [],
  columns = [],
  searchQuery = "",
  actionLabel = "Perform Action",
  hasCheckbox = true,
  hasAction = true,
  onSelectionChange = () => {},
}) {
  const [visibleRows, setVisibleRows] = useState([]);
  const [index, setIndex] = useState(rowsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const firstSlice = filteredRows.slice(0, rowsPerPage);
    setVisibleRows(firstSlice);
    setIndex(rowsPerPage);
    setSelectedRows([]);
    onSelectionChange([]);
  }, [searchQuery, rows]);

  const handleSelectAll = (event) => {
    const newSelected = event.target.checked ? visibleRows : [];
    setSelectedRows(newSelected);
    onSelectionChange(newSelected);
    console.log("Selected Rows:", newSelected);
  };

  const handleSelectRow = (row) => {
    setSelectedRows((prev) => {
      const exists = prev.includes(row);
      const updated = exists ? prev.filter((r) => r !== row) : [...prev, row];
      onSelectionChange(updated);
      console.log("Selected Rows:", updated);
      return updated;
    });
  };

  const Accepted = () => {
    console.log("Accepted action performed");
  };

  const Rejected = () => {
    console.log("Rejected action performed");
  };

  const getStatusColor = (status) => {
    const statusColors = {
      Passed: "green",
      Pending: "gray",
      Failed: "red",
      Inactive: "orange",
      Accepted: "blue",
      Rejected: "purple",
    };
    return statusColors[status] || "black";
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {hasCheckbox && (
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    selectedRows.length === visibleRows.length &&
                    visibleRows.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
            )}
            {columns.map((col) => {
              if (col.key === "action" && !hasAction) return null;
              return (
                <TableCell key={col.key} align={col.align || "left"}>
                  {col.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row, i) => (
            <TableRow key={i}>
              {hasCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(row)}
                    onChange={() => handleSelectRow(row)}
                  />
                </TableCell>
              )}
              {columns.map((col) => {
                if (col.key === "action" && !hasAction) return null;
                return (
                  <TableCell
                    key={col.key}
                    align={col.align || "left"}
                    sx={
                      col.colorStatus
                        ? { color: getStatusColor(row[col.key]) }
                        : {}
                    }
                  >
                    {col.key === "action" ? (
                      <Button variant="outlined" size="small">
                        {actionLabel}
                      </Button>
                    ) : col.key === "accepted" ? (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={Accepted}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={Rejected}
                        >
                          Declined
                        </Button>
                      </Box>
                    ) : (
                      row[col.key]
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
