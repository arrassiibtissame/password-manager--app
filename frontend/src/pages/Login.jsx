import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      login(res.data.token);
      alert("Login successful ✅");    

      navigate("/dashboard");
    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE DATA:", err.response?.data);
  console.log("MESSAGE:", err.message);

  alert(err.response?.data?.message || err.message);
}
  };

  return (
    <div>
      <h1>Login</h1>

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

      <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <a href="/register">Register </a></p>
    </div>
  );
}

export default Login;