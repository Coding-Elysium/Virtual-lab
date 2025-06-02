import { Box } from "@mui/material";

const Accounts = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        gap: 4,
      }}
    ></Box>
  );
};

export default Accounts;
