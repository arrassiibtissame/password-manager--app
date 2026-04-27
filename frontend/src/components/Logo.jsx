function Logo() {
  return (
    <div className="auth-logo">
      <div className="auth-logo-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="4" y="10" width="16" height="12" rx="3" fill="white" fillOpacity="0.92"/>
          <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="2" fill="#9b59f7"/>
          <line x1="12" y1="18" x2="12" y2="20" stroke="#9b59f7" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div>
        <div className="auth-logo-name">Pass<span>Vault</span></div>
        <div className="auth-logo-slogan">One key for everything</div>
      </div>
    </div>
  );
}

export default Logo;