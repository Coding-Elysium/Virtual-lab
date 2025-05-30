import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";
import Students from "../pages/Students";
import Dashboard from "../pages/Dashboard";
import Accounts from "../pages/Accounts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "students",
    title: "Students",
    icon: <PeopleIcon />,
  },
  {
    segment: "accounts",
    title: "Accounts",
    icon: <PeopleIcon />,
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <PeopleIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/logout") {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  }, [pathname, navigate]);
  return (
    <Box sx={{ py: 4, px: 4 }}>
      {pathname === "/students" ? (
        <Students pathname="students" />
      ) : pathname === "/accounts" ? (
        <Accounts pathname="accounts" />
      ) : pathname === "/logout" ? (
        <Typography>Logging out...</Typography>
      ) : (
        <Dashboard pathname="dashboard" />
      )}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardMain(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;
  console.log(demoWindow);

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        branding={{
          title: "Virtual-Lab Simulator",
        }}
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

DashboardMain.propTypes = {
  window: PropTypes.func,
};

export default DashboardMain;
