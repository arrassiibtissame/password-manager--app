import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function Dashboard() {
  return <h1>Dashboard ✅</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;