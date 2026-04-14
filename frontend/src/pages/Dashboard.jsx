import {useEffect, useState} from "react";
import axios from "axios";


function Dashboard() {
    const[passwords, setPasswords] = useState([]);
    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [site, setSite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        // Fetch saved passwords from the backend
       const fetchPasswords = async () => {
        const token = localStorage.getItem("token");
        console.log("Token being sent:",token);
        try {
            const res =await axios.get(
                 "http://localhost:3000/api/passwords",
                 {
                    headers:{
                        Authorization :`Bearer ${token}`,
                    },
                 }
            );
           
            setPasswords(res.data);
        }
  catch (err){
    console.log("ERROR:", err.response?.data || err.message);
  }};
  // add password function
  const handleAddPassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try{
        await axios.post(
            "http://localhost:3000/api/passwords",
            {
                title,
                site,
                username,
                password
            },
            {
                headers:{
                    Authorization :`Bearer ${token}`,
                },
            }
        );
        alert("Password added successfully!");
        setTitle("");
        setSite("");
        setUsername("");
        setPassword("");
        fetchPasswords();
    } catch (err) {
        console.log(err);
        alert("Failed to add password!");
    }
};
fetchPasswords();
    }, []);

    return(
        <div style ={{ maxWidth: "500px", margin:"auto"}}>
            <h2>Dashboard</h2>
            {/* ADD PASSWORD FORM */ }
            <form onSubmit ={handleAddPassword}>
                <h3>Add New Password</h3>
                <input 
                placeholder = "Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <input
                placeholder = "Site"
                value={site}
                onChange={(e) => setSite(e.target.value)}/>
                <input
                placeholder = "Username"
                value={username}
                onChange = {(e) => setUsername(e.target.value)}/>
                <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Add Password</button>
            </form>
           <hr />
           {/*Passwords list */}
           {passwords.length === 0 ? (
            <p>No passwords saved yet.</p>
           ) : (
            passwords.map((p) => (
                <div key={p._id}>
                    <h4>{p.title}</h4>
                    <p>Site: {p.site}</p>
                    <p>Username: {p.username}</p>
                    <p>Password: {p.password}</p>
                </div>
            ))
           )}
        </div>
    );
}
export default Dashboard;