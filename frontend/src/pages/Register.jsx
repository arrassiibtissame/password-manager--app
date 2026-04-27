import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Logo from "../components/Logo";
 
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const getStrength = () => {
    if (password.length === 0) return { bars: 0, label: "", color: "" };
    if (password.length < 6)   return { bars: 1, label: "Weak",   color: "weak" };
    if (password.length < 10)  return { bars: 2, label: "Fair",   color: "medium" };
    if (password.length < 14)  return { bars: 3, label: "Strong", color: "strong" };
    return                            { bars: 4, label: "Very strong", color: "strong" };
  };
 
  const strength = getStrength();
 
  const handleRegister = async () => {
    if (!username || !email || !password) {
      return toast.error("Please fill all fields");
    }
    try {
      setLoading(true);
      await register({ username, email, password });
      toast.success("Account created successfully");
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
            <div className="auth-feat"><div className="auth-feat-dot"></div>Free forever, no credit card</div>
            <div className="auth-feat"><div className="auth-feat-dot"></div>Set up in under 2 minutes</div>
            <div className="auth-feat"><div className="auth-feat-dot"></div>Your data stays yours</div>
          </div>
        </div>
      </div>
 
      {/* ── Right panel ── */}
      <div className="auth-right">
        <div className="auth-card">
          <Logo />
          <span className="auth-badge">Create account</span>
          <h2 className="auth-heading">Get started</h2>
          <p className="auth-sub">Your passwords, safe forever</p>
 
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              className="auth-input"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
 
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
            {password.length > 0 && (
              <>
                <div className="auth-strength">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`auth-strength-bar ${i <= strength.bars ? strength.color : ""}`}
                    />
                  ))}
                </div>
                <div className="auth-strength-label">Strength: {strength.label}</div>
              </>
            )}
          </div>
 
          <button className="auth-btn" onClick={handleRegister} disabled={loading}>
            {loading ? "Creating your vault..." : "Create my vault"}
          </button>
 
          <div className="auth-footer">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
 
    </div>
  );
}
 
export default Register;