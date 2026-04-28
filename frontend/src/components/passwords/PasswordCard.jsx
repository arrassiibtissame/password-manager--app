import { useState } from "react";

function PasswordCard({ password, onDelete, onEdit }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(password.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Generate a consistent color per title initial
  const colors = ["#9b59f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
  const colorIndex = (password.title?.charCodeAt(0) || 0) % colors.length;
  const accent = colors[colorIndex];

  return (
    <div className="pw-card">
      {/* Card header */}
      <div className="pw-card-header">
        <div className="pw-card-avatar" style={{ background: accent }}>
          {password.title?.slice(0, 2).toUpperCase() || "??"}
        </div>
        <div className="pw-card-info">
          <h3 className="pw-card-title">{password.title}</h3>
          <p className="pw-card-site">{password.site}</p>
        </div>
      </div>

      {/* Username row */}
      <div className="pw-card-row">
        <span className="pw-card-row-label">Username</span>
        <span className="pw-card-row-value">{password.username || "—"}</span>
      </div>

      {/* Password row */}
      <div className="pw-card-row">
        <span className="pw-card-row-label">Password</span>
        <span className="pw-card-row-value pw-card-password">
          {show ? password.password : "••••••••••"}
        </span>
      </div>

      {/* Actions */}
      <div className="pw-card-actions">
        <button className="pw-btn pw-btn-icon" onClick={() => setShow(!show)} title={show ? "Hide" : "Show"}>
          {show ? (
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
              <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
          )}
        </button>

        <button className="pw-btn pw-btn-icon" onClick={handleCopy} title="Copy password">
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
              <path d="M20 6L9 17l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        <button className="pw-btn pw-btn-icon" onClick={() => onEdit(password)} title="Edit">
          <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <button className="pw-btn pw-btn-danger" onClick={() => onDelete(password._id)} title="Delete">
          <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
            <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PasswordCard;