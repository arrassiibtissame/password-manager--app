import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>

      {/* ✅ LOGIN */}
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* ✅ REGISTER */}
      <Route
        path="/register"
        element={token ? <Navigate to="/dashboard" /> : <Register />}
      />

      {/* ✅ DASHBOARD (protected) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ DEFAULT ROUTE */}
      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} />}
      />

    </Routes>
  );
}

export default App;