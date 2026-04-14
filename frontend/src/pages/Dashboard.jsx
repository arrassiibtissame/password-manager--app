import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [passwords, setPasswords] = useState([]);

  const [title, setTitle] = useState("");
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);  

  // ✅ FUNCTION 1: FETCH PASSWORDS
  const fetchPasswords = async () => {
    const token = localStorage.getItem("token");
    console.log("token:",localStorage.getItem("token"));
    console.log("SENDING TOKEN:", token);

    try {
      const res = await axios.get("http://localhost:3000/api/passwords", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPasswords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FUNCTION 2: ADD PASSWORD 
  const handleAddPassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3000/api/passwords",
        {
          title,
          site,
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    fetchPasswords();
  }, []);
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
        await axios.delete(`http://localhost:3000/api/passwords/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchPasswords(); // refresh list
    } catch (err) {
        console.log(err);
        alert("Error ❌");

    }};
    // logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/"; // redirect to login
    };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Dashboard</h2>

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
      <button onClick={() => setShowPasswords(!showPasswords)}>
        {showPasswords ? "Hide Passwords 🙈" : "Show Passwords 👁"}
        </button>

      {passwords.length === 0 ? (
        <p>No passwords yet</p>
      ) : (
        passwords.map((p) => (
          <div key={p._id}>
            <h4>{p.title}</h4>
            <p>{p.site}</p>
            <p>{p.username}</p>
            <p>{ showPasswords ? p.password : "••••••••" }</p>
            <button onClick={()=> handleDelete(p.id)}>Delete </button>
          </div>

        ))
        

      )}
       <button onClick ={handleLogout}>Logout</button>  
    </div>
   
  );
}

export default Dashboard;