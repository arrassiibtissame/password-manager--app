import { useState } from "react";
import { usePasswords } from "../hooks/usePasswords";

import Layout from "../components/layout/Layout";
import PasswordCard from "../components/passwords/PasswordCard";
import PasswordForm from "../components/passwords/PasswordForm";
import Navbar from "../components/layout/Navbar";

function Dashboard() {
  const {
    passwords,
    createPassword,
    removePassword,
  } = usePasswords();

  const [showPasswords, setShowPasswords] = useState(false);
  const [search,setSearch]=useState("");

  const filteredPasswors = passwords.filter((p)=>
  p.title.toLowerCase().includes(search.toLowerCase())||
p.site.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>

      {/* HEADER */}
       <Navbar />
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard 📊
        </h1>
        <p className="text-gray-400">
          Manage your passwords securely
        </p>
      </div>

      {/* FORM */}
      <PasswordForm onAdd={createPassword} />

      {/* TOGGLE */}
      <button
        onClick={() => setShowPasswords(!showPasswords)}
        className="mb-4 bg-blue-600 px-3 py-1 rounded"
      >
        {showPasswords ? "Hide" : "Show"} Passwords
      </button>
      <input
  placeholder="Search passwords..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
/>

      {/* LIST */}
      <div>
        {filteredPasswords.map((item) => (
          <PasswordCard
            key={item._id}
            item={item}
            show={showPasswords}
            onDelete={removePassword}
          />
        ))}
      </div>

    </Layout>
  );
}

export default Dashboard;