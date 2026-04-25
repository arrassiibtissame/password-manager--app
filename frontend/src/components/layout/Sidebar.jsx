import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
    >
      {/* sidebar */}
      <div className="sidebar">
        <h2 className="logo">🔐 Password Manager</h2>

        <nav className="menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/passwords">Passwords</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </div>
    </motion.div>
  );
}

export default Sidebar;