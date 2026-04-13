import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Dashboard() {
  return <h1>Dashboard ✅</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;