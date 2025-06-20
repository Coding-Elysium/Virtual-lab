import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardMain from "../components/DashboardMain";

import Dashboard from "../pages/Dashboard";
import AddStudent from "../pages/AddStudent";
import StudentRecords from "../pages/StudentRecords";
import AddAdmin from "../pages/AddAdmin";
import AdminRecords from "../pages/AdminRecords";
import StudentReview from "../pages/StudentReview";
import StudentProfile from "../components/StudentProfile";
import Logout from "../components/Logout";
import ProtectedRoute from "../components/ProtectedRoute";
import Coc1 from "../components/Coc1";
import COCDetail from "../pages/COCDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardMain />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        index: true,
        path: "addStudent",
        element: <AddStudent />,
      },
      {
        path: "studentRecords",
        element: <StudentRecords />,
      },
      {
        path: "addAdmin",
        element: <AddAdmin />,
      },
      {
        path: "adminRecords",
        element: <AdminRecords />,
      },
      {
        path: "studentReview",
        element: <StudentReview />,
      },
      {
        path: "studentProfile/:studentId",
        element: <StudentProfile />,
      },
      {
        path: "studentProfile/:studentId/coc1",
        element: <COCDetail />,
      },
      { path: "*", element: <h2>404 - Page not found</h2> },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
