import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider } from "@toolpad/core/internal";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Student",
    icon: <PeopleIcon />,
    children: [
      { segment: "dashboard/addStudent", title: "Add Student" },
      { segment: "dashboard/studentReview", title: "Student Review" },
      { segment: "dashboard/studentRecords", title: "Student Records" },
    ],
  },
  {
    title: "Admin",
    icon: <AdminPanelSettingsIcon />,
    children: [
      { segment: "dashboard/addAdmin", title: "Add Admin" },
      { segment: "dashboard/adminRecords", title: "Admin Records" },
    ],
  },
  {
    title: "Logout",
    segment: "logout",
    icon: <LogoutIcon />,
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

function DashboardMain(props) {
  const { window } = props;
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === "/logout") {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        branding={{ title: "Virtual-Lab Simulator" }}
        navigation={NAVIGATION}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <Box sx={{ py: 4, px: 4 }}>
            <Outlet />
          </Box>
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

DashboardMain.propTypes = {
  window: PropTypes.func,
};

export default DashboardMain;
