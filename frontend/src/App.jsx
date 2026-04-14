import {Routes,Route,Navigate} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


function App() {  
  const isLoggedIn = useState(!!localStorage.getItem("token"));
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <Routes>
      {/*login*/}
      <Route path="/" element={isLoggedIn? (<Navigate to="/dashboard" />) : (<Login  setIsLoggedIn={setIsLoggedIn}/>) } />
      {/*register*/}
      <Route path="/register" element={<Register />} />
      {/*dashboard*/}
      <Route
        path="/dashboard"
        element={isLoggedIn ? (
         
            <Dashboard handleLogout={handleLogout} />
        ):(
          <Navigate to="/" />
         )
        }
      />
    </Routes>
  );
}

export default App;