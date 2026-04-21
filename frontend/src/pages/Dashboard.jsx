import {useState, useEffect, useContext }from "react";
import {AuthContext} from "../context/AuthContext";
import api from "../api/axios";

import Layout from "../components/layout/Layout";
import PasswordCard from "../components/passwords/PasswordCard";
import PasswordForm from "../components/passwords/PasswordForm";
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
      <h2>Your Passwords </h2>

      <PasswordForm onSuccess={fetchPasswords} />

      <PasswordCard
        passwords={passwords}
        refresh={fetchPasswords}
      />
    </Layout>
  );
}

export default Dashboard;
