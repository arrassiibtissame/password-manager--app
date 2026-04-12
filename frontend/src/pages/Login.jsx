import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handelLogin = async (e) => {
        e.preventDefault();
        try {
            const res =await axios.post ("http://localhost:3000/api/auth/login", {email, password});
            //save token 
            localStorage.setItem("token", res.data.token);
            alert ("Login successful ✅");
            //go to dashboard
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            alert("Login failed ❌");
        }};
    return (
        <div style ={{ maxWidth: "400px",margin:"auto"}}>
            <h2>Login</h2>
            <form onSubmit ={handelLogin}>
                <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style= {{ display: "block",marginBottom: "10px",width: "100%",padding: "8px"}}/>
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                style={{ display: "block",marginBottom: "10px",width: "100%",padding: "8px"}}/>
                <button type="submit" style={{ padding: "10px 20px"}}>Login</button>
            </form>
        </div>
    );}
    export default Login;