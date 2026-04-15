import {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";

function Register ({setIsLoggedIn}){
    const [username, setUsername] = useState("");
    const [email, setEmail]=useState("");
    const [password,setPassword]= useState("");
    const { login } = useContext(AuthContext);

    const [message,setMessage] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleRegister =async () => {
        try {
          const res = await api.post("/auth/register", {username, email, password});
            
            //save token 
           login(res.data.token);
         
            setMessage("✅ Registered successfully!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
        catch (err){
            setError("❌ Registration failed!");
            console.log(err.response?.data || err.message);
        }
        };
        return (
            <div style={{maxWidth:"400px",margin:"auto"}}>
                <h2>Register</h2>
                <input
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
                <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleRegister}>Register  </button>
                <p>Already have an account? <a href="/">Login </a></p>  
                {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

            </div>
        );
    }
export default Register;