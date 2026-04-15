import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      navigate("/dashboard");
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">

      <div className="w-[350px] p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account 🚀
        </h1>

        <input
          className="w-full p-2 mb-3 rounded bg-black/30 border border-white/20"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 rounded bg-black/30 border border-white/20"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 rounded bg-black/30 border border-white/20"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-400">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;