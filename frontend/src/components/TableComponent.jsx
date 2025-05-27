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
} from "@mui/material";

const rowsPerPage = 10;

export default function TableComponent({
  rows = [],
  columns = [],
  searchQuery = "",
  onBulkAction = () => {},
  actionLabel = "Perform Action",
  hasCheckbox = true,
  hasAction = true,
}) {
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [index, setIndex] = React.useState(rowsPerPage);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    setVisibleRows(filteredRows.slice(0, rowsPerPage));
    setIndex(rowsPerPage);
    setSelectedRows([]);
  }, [searchQuery, rows]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = visibleRows.map((_, i) => i);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (idx) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
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
                    checked={selectedRows.includes(i)}
                    onChange={() => handleSelectRow(i)}
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
