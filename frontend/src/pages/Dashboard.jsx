import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CardComponent from "../components/CardComponent";
import BarGraphComponent from "../components/BarGraphComponen";

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  console.log("Logged in as:", admin?.email);

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        gap: 4,
        pr: isSmallScreen ? 0 : 6,
        pl: isSmallScreen ? 0 : 6,
        pt: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 4,
        }}
      >
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 4,
          width: "100%",
        }}
      >
        <BarGraphComponent />
        <BarGraphComponent />
      </Box>
    </Box>
  );
};

export default Dashboard;
