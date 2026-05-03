import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
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
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="15.5" r="1.5" fill="currentColor"/>
        </svg>
      ),
    },
    
  ];

  return (
    <motion.div
      className="sidebar"
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10" width="16" height="12" rx="3" fill="white" fillOpacity="0.92"/>
            <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="2" fill="#9b59f7"/>
            <line x1="12" y1="18" x2="12" y2="20" stroke="#9b59f7" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="sidebar-logo-name">Pass<span>Vault</span></div>
          <div className="sidebar-logo-slogan">One key for everything</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`sidebar-link ${location.pathname === link.to ? "active" : ""}`}
          >
            <span className="sidebar-link-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 12H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Logout
        </button>
      </div>
    </motion.div>
  );
}

export default Sidebar;