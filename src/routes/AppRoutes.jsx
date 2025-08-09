import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Patients from "../Pages/Patients";
import Doctors from "../Pages/Doctors";
import Staff from "../Pages/Staff";
import UploadReports from "../Pages/UploadReports";
import Reminders from "../Pages/Reminders";
import Appointments from "../Pages/Appointments";
import Reports from "../Pages/Reports";
import Prescriptions from "../Pages/Prescriptions";
import Settings from "../Pages/Settings";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="staff" element={<Staff />} />
          <Route path="upload-reports" element={<UploadReports />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
