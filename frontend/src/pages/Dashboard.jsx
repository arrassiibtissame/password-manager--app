import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import Layout from "../components/layout/Layout";
import PasswordList from "../components/passwords/PasswordList";
import PasswordForm from "../components/passwords/PasswordForm";
import { motion } from "framer-motion";

function Dashboard() {
  const { token } = useContext(AuthContext);
  const [passwords, setPasswords] = useState([]);

  const fetchPasswords = async () => {
    const res = await api.get("/passwords");
    setPasswords(res.data);
  };

  useEffect(() => {
    if (token) fetchPasswords();
  }, [token]);

  return (
    <Layout>
      <div className="dashboard-header">
        <h1>Welcome Back 🔐</h1>
        <p>Your passwords are safe and encrypted.</p>
      </div>

      <h2>Your Passwords 🔐</h2>

      <PasswordForm onSuccess={fetchPasswords} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PasswordList
          passwords={passwords}
          refresh={fetchPasswords}
        />
      </motion.div>
    </Layout>
  );
}

export default Dashboard;