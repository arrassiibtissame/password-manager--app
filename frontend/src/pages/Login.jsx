import { useState}  from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate ("/dashboard");
        } catch {}
    };
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className= "w-[350px] p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back </h1>
        <input
        className="w-full p-2 mb-3 rounded bg-black/30 border border-white/20 "
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        type="password"
        className="w-full p-2 mb-3 rounded bg-black/30 border border-white/20 "
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
{error && (<p className="text-red-500 mb-3">{error}</p>)}
<button 
onclick={handleLogin}
disabled={loading}
className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">
{loading ? "Logging in..." : "Login"}
</button>
<p className="text-sm mt-4 text-center">
  Don't have an account? {" "}
  <a href="/register" className="text-blue-400">Register</a>
</p>
        </div>  
      </div>);
    }
export default Login;