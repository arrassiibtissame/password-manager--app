import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load token on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // ✅ REGISTER
  const register = async (formData) => {
    try {
      const res = await axios.post("/api/auth/register", formData);

      setToken(res.data.token); // ✅ FIX
      setUser(res.data.user);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ LOGIN
  const login = async (formData) => {
    try {
      const res = await axios.post("/api/auth/login", formData);

      setToken(res.data.token);
      setUser(res.data.user);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard"); // ✅ FIX
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);   // ✅ IMPORTANT
    setUser(null);

    navigate("/login"); // ✅ FIX
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}