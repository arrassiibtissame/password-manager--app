import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
  {
    return localStorage.getItem("token");
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //  Load token on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  //  REGISTER
  const register = async (formData) => {
    try {
      const res = await axios.post("/auth/register", formData);

      setToken(res.data.token); 
      setUser(res.data.user);

      localStorage.setItem("token", res.data.token);
 return res.data;
      
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      throw err;
    }
  };

  //  LOGIN
  const login = async (formData) => {
    try {
      const res = await axios.post("/auth/login", formData);

      setToken(res.data.token);
        setUser(res.data.user);
      

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
 return res.data;
    
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  //  LOGOUT
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);   
    setUser(null);

    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}