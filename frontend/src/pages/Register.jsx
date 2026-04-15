import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";

function Register ({setIsLoggedIn}){
    const [username, setUsername] = useState("");
    const [email, setEmail]=useState("");
    const [password,setPassword]= useState("");

    const [message,setMessage] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleRegister =async () => {
        try {
           api.get("/passwords");
            console.log("Registration response:", res.data);
            //save token 
            localStorage.setItem("token", res.data.token);
            setIsLoggedIn(true);
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