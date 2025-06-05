import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardMain from "../components/DashboardMain";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentProfile from "../components/StudentProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardMain />,
    // </ProtectedRoute>
  },
  {
    path: "/studentProfile",
    element: <StudentProfile />,
  },
]);

export default router;
