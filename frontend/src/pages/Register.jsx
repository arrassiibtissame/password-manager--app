import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register (){
    const [username, setUsername] = useState("");
    const [email, setEmail]=useState("");
    const [password,setPassword]= useState("");
    const navigate = useNavigate();

    const handleRegister =async () => {
        try {
            const res = await axios.post (
                "http://localhost:3000/api/auth/register",{
                    username,
                    email,
                    password,
                }
            );
            console.log (res.data);
            alert("Register successful ✅");
            navigate ("/dashboard");
        }
        catch (err){
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

            </div>
        );
    }
export default Register;