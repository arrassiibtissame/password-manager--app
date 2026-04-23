import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
     localStorage.removeItem("token");
  
    setUser(null);
    Navigate("/login");
   
  };

  return (
    <AuthContext.Provider value={{ token, user, login,register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
