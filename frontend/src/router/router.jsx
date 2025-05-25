import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardMain from "../components/DashboardMain";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardMain />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
