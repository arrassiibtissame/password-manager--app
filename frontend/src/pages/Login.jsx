import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Logo from "../components/Logo";

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
      await login({ email, password });
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      {/* ── Left panel ── */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-big-logo">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="10" width="16" height="12" rx="3" fill="white" fillOpacity="0.92"/>
              <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="2" fill="#9b59f7"/>
              <line x1="12" y1="18" x2="12" y2="20" stroke="#9b59f7" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="auth-brand-name">Pass<span>Vault</span></div>
          <div className="auth-brand-slogan">One key for everything</div>
          <div className="auth-features">
            <div className="auth-feat"><div className="auth-feat-dot"></div>End-to-end encrypted storage</div>
            <div className="auth-feat"><div className="auth-feat-dot"></div>Zero-knowledge architecture</div>
            <div className="auth-feat"><div className="auth-feat-dot"></div>Access from any device</div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="auth-right">
        <div className="auth-card">
          <Logo />
          <span className="auth-badge">Secure login</span>
          <h2 className="auth-heading">Welcome back</h2>
          <p className="auth-sub">Sign in to access your vault</p>

          <div className="auth-field">
            <label className="auth-label">Email address</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Master password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="auth-divider">
            <div className="auth-divider-line"></div>
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line"></div>
          </div>

          <div className="auth-footer">
            No account yet? <a href="/register">Create one</a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;