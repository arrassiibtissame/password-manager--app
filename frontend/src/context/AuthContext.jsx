import { createContext, useState, useEffect} from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token,setToken] = useState(null);
    //load token on app start
    useEffect(()=>
    {
        const savedToken = localStorage.getItem("token");
        if(savedToken)
        {
            setToken(savedToken);
        }
    }, []);
    const login =(newToken)=>{
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };
    const logout =()=>{
        localStorage.removeItem("token");
        setToken(null);
    };
        return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}