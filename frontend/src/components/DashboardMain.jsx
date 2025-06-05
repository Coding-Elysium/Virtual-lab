import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";
import Dashboard from "../pages/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddStudent from "../pages/AddStudent";
import StudentRecords from "../pages/StudentRecords";
import AddAdmin from "../pages/AddAdmin";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AdminRecords from "../pages/AdminRecords";
import StudentReview from "../pages/StudentReview";

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
    title: "Student",
    icon: <PeopleIcon />,
    children: [
      {
        segment: "addStudent",
        title: "Add Student",
      },
      {
        segment: "studentReview",
        title: "Student Review",
      },
      {
        segment: "studentRecords",
        title: "Student Records",
      },
    ],
  },
  {
    title: "Admin",
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        segment: "addAdmin",
        title: "Add Admin",
      },

      {
        segment: "adminRecords",
        title: "Admin Records",
      },
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
      {pathname === "/addStudent" ? (
        <AddStudent />
      ) : pathname === "/studentRecords" ? (
        <StudentRecords />
      ) : pathname === "/addAdmin" ? (
        <AddAdmin />
      ) : pathname === "/studentReview" ? (
        <StudentReview />
      ) : pathname === "/adminRecords" ? (
        <AdminRecords />
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
