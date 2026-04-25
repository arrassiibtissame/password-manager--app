import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {toast} from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
     return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

        await login( {
        email,
        password,
      });

      

      toast.success("Login successful");
    } catch (err) {
      console.log(err);
     toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className= "auth-container">
      <div className="auth-left">
        <img src="/assets/img1.jpg" />
        </div>
    <div  className = "auth-right" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
    </div>
  );
  }


export default Login;