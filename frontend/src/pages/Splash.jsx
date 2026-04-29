import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar fills over 2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      navigate("/login");
    }, 2200);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <div className="splash-container">
      {/* Background blobs */}
      <div className="splash-blob splash-blob-1" />
      <div className="splash-blob splash-blob-2" />
      <div className="splash-blob splash-blob-3" />

      {/* Main content */}
      <motion.div
        className="splash-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated logo icon */}
        <motion.div
          className="splash-logo-icon"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <motion.div
            animate={{ boxShadow: [
              "0 0 0px rgba(155,89,247,0)",
              "0 0 40px rgba(155,89,247,0.5)",
              "0 0 0px rgba(155,89,247,0)",
            ]}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="splash-logo-glow"
          >
            <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
              <rect x="4" y="10" width="16" height="12" rx="3" fill="white" fillOpacity="0.95"/>
              <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="2" fill="#9b59f7"/>
              <line x1="12" y1="18" x2="12" y2="20" stroke="#9b59f7" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Brand name */}
        <motion.div
          className="splash-brand"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h1 className="splash-name">Pass<span>Vault</span></h1>
          <p className="splash-slogan">One key for everything</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="splash-progress-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="splash-progress-track">
            <div className="splash-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="splash-loading-text">Loading your vault securely...</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Splash;