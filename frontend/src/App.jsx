import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
   return  !!localStorage.getItem("token");
});

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />

      {/* REGISTER */}
      <Route path="/register" element=
      {isLoggedIn ?(<Navigate to="/dashboard"/>) : (<Register setIsLoggedIn={setIsLoggedIn} />)} />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard handleLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;