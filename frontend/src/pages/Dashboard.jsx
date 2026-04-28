import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Layout from "../components/layout/Layout";
import PasswordList from "../components/passwords/PasswordList";
import PasswordForm from "../components/passwords/PasswordForm";
import { motion } from "framer-motion";

function Dashboard() {
  const { token, user } = useContext(AuthContext);
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchPasswords = async () => {
    const res = await api.get("/passwords");
    setPasswords(res.data);
  };

  useEffect(() => {
    if (token) fetchPasswords();
  }, [token]);

  const filtered = passwords.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.site?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* ── Welcome header ── */}
      <motion.div
        className="dash-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="dash-header-left">
          <p className="dash-greeting">Welcome back,</p>
          <h1 className="dash-username">
            {user?.username || "User"} <span className="dash-lock">🔐</span>
          </h1>
          <p className="dash-sub">Your passwords are safe and encrypted.</p>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-number">{passwords.length}</span>
          <span className="dash-stat-label">Saved passwords</span>
        </div>
      </motion.div>

      {/* ── Toolbar: search + add button ── */}
      <div className="dash-toolbar">
        <div className="dash-search-wrap">
          <svg className="dash-search-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            className="dash-search"
            placeholder="Search by title or site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="dash-add-btn" onClick={() => setShowForm(true)}>
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Password
        </button>
      </div>

      {/* ── Password grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <PasswordList passwords={filtered} refresh={fetchPasswords} />
      </motion.div>

      {/* ── Add password modal ── */}
      {showForm && (
        <PasswordForm
          onSuccess={() => { fetchPasswords(); setShowForm(false); }}
          onClose={() => setShowForm(false)}
        />
      )}
    </Layout>
  );
}

export default Dashboard;