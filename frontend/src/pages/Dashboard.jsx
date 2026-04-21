import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import Layout from "../components/layout/Layout";
import PasswordList from "../components/passwords/PasswordList";
import PasswordForm from "../components/passwords/PasswordForm";

function Dashboard (){
  const { token } = useContext(AuthContext);
  const [passwords, setPasswords] = useState([]);
  const fetchPasswords =async() =>{
    const res =await api.get("/passwords");
    setPasswords(res.data);
  };
 useEffect(() => {
    if (token) fetchPasswords();
  }, [token]);

  return (
    <Layout>
      <h2>Dashboard</h2>

      <PasswordForm onSuccess={fetchPasswords} />

      <PasswordList
        passwords={passwords}
        refresh={fetchPasswords}
      />
    </Layout>
  );
}

export default Dashboard;
