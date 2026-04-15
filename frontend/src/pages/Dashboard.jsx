import { useEffect, useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import api from "../api/axios";

function Dashboard() {
  const [passwords, setPasswords] = useState([]);

  const [title, setTitle] = useState("");
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false); 
  const { token, logout } = useContext(AuthContext); 

  // ✅ FUNCTION 1: FETCH PASSWORDS
  const fetchPasswords = async () => {

    try {
      
const res = await api.get("/passwords");
     
      setPasswords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FUNCTION 2: ADD PASSWORD 
  const handleAddPassword = async (e) => {
    e.preventDefault();


    try {
     await api.post("/passwords", { title, site, username, password });

      alert("Password added ✅");

      setTitle("");
      setSite("");
      setUsername("");
      setPassword("");

      fetchPasswords(); // refresh list
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  // ✅ useEffect ONLY calls functions
  useEffect(() => {
    if (token) fetchPasswords();
  }, [token]);
  const handleDelete = async (id) => {
    console.log("Deleting password with id:", id);
    try {
        await api.delete(`/passwords/${id}`);
        alert("Password deleted ✅");
        fetchPasswords(); // refresh list
    } catch (err) {
        console.log(err);
        alert("Error ❌");

    }};
    // logout function
    const handleLogout = () => {
        logout(); 
        window.location.href="/";

    
    };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Dashboard</h2>
      <div className="text-3xl font-bold text-blue-600">
  Tailwind is working 🚀
</div>

      <form onSubmit={handleAddPassword}>
        <h3>Add Password</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <hr />
      <button onClick={() => setShowPasswords(prev => !prev)}>
        {showPasswords ? "Hide Passwords 🙈" : "Show Passwords 👁"}
        </button>

      {passwords.length === 0 ? (
        <p>No passwords yet</p>
      ) : (
        passwords.map((p) => {
             
            return (
          <div key={p._id}>
            <h4>{p.title}</h4>
            <p>{p.site}</p>
            <p>{p.username}</p>
           
            <p>{ showPasswords ? p.password : "••••••••" }</p>
            
            <button onClick={()=> handleDelete(p._id)}>Delete </button>
          </div>

        );
    })
)}
        

    
       <button onClick ={handleLogout}>Logout</button>  
    </div> 
   
  );
}

export default Dashboard;