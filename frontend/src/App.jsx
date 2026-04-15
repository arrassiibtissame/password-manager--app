import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
 const { token } = useContext(AuthContext);

  

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/"
        element={
          token ? 
            <Navigate to="/dashboard" />
           : <Login />
            
          
        }
      />

      {/* REGISTER */}
      <Route path="/register" element=
      {token ?<Navigate to="/dashboard"/> : <Register />} />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          token ? 
            <Dashboard/>
    
           : <Navigate to="/" />
          
        }
      />
    </Routes>
  );
}

export default App;