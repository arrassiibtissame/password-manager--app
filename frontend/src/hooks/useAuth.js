import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export function useAuth(){
    const [loadding, setLoading]= useState(false);
    const [error, setError] = useState("");
    const login = async (username, password) =>{
        setLoading(true);
        setError("");
        try {
            const data =await loginUser(username, password);
            localStorage.setItem("token", data.token);
            return data;
        } catch (err){
            setError(err.response?.data?.message || "Login failed");
            throw err;
        }
        finally{
            setLoading(false);
        }};
        const register = async (username, email, password) =>{
            setLoading(true);
            setError("");
            try {
                const data = await registerUser(username, email, password);
                localStorage.setItem("token", data.token);
                return data;
            } catch (err){
                setError(err.response?.data?.message || "Registration failed");
                throw err;
            }
            finally{
                setLoading(false);
            }
        };
const logout = () =>{
    localStorage.removeItem("token");
};
return useContext(AuthContext);
};
