import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function BottomNav() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const links = [
    {
      to: "/dashboard",
      label: "Home",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      ),
    },
    {
      to: "/passwords",
      label: "Passwords",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="15.5" r="1.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      to: null,
      label: "Logout",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 12H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      action: true,
    },
  ];

  return (
    <nav className="bottom-nav">
      {links.map((link) =>
        link.action ? (
          <button
            key={link.label}
            className="bottom-nav-item bottom-nav-logout"
            onClick={logout}
          >
            <span className="bottom-nav-icon">{link.icon}</span>
            <span className="bottom-nav-label">{link.label}</span>
          </button>
        ) : (
          <Link
            key={link.to}
            to={link.to}
            className={`bottom-nav-item ${location.pathname === link.to ? "active" : ""}`}
          >
            <span className="bottom-nav-icon">{link.icon}</span>
            <span className="bottom-nav-label">{link.label}</span>
          </Link>
        )
      )}
    </nav>
  );
}

export default BottomNav;