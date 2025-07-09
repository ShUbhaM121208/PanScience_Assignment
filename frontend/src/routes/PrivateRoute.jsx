import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // adjust path as needed
import Dashboard from "../pages/Dashboard";
import CreateTask from "../pages/CreateTask";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import AdminRoute from "./AdminRoute"; // if using

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected routes */}
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/create" element={<CreateTask />} />
      {/* Add more protected routes here */}
    </Route>

    {/* Example admin-only route */}
    {/* <Route element={<AdminRoute />}>
      <Route path="/admin" element={<AdminDashboard />} />
    </Route> */}
  </Routes>
);

export default AppRoutes;
