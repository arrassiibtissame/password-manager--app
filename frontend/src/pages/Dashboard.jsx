import {  useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { usePasswords } from "../hooks/usePasswords";

import PasswordCard from "../components/passwords/PasswordCard";
import PasswordForm from "../components/passwords/PasswordForm";
import { defaults } from "autoprefixer";
function Dashboard() {
  const {logout}= useContext(AuthContext);
  const {passwords, createPassword, removePassword} =usePasswords();
  const [showPasswords, setShowPasswords]=useState(false);
  
  const handleLogout =()=>{
    logout();
    window.location.href="/";
  
    };

  return (
   
      <div className = "max_w_2xl mx-auto text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {/*form*/}
        <PasswordForm onAdd={createPassword}/>
        {/*toggle*/}
        <button onClick={() => setShowPasswords(!showPasswords)}
        className="mb-4 bg-blue-500 px-3 py-1 rounded">{showPasswords ? "Hide" : "Show"} Passwords</button>
        {/*list*/}
        {passwords.map((item) => (
          <PasswordCard key={item._id} item={item} show={showPasswords} onDelete={removePassword}/>
        ))}
       {/*logout*/}
       <button onClick={handleLogout} className="mt-6 bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>);}
      export default Dashboard;
