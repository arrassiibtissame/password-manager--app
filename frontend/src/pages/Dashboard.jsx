import {useEffect, useState} from "react";
import axios from "axios";


function Dashboard() {
    const[passwords, setPasswords] = useState([]);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
       const fetchPasswords = async () => {
        try {
            const res =await axios.get(
                 "http://localhost:3000/api/passwords",
                 {
                    headers:{
                        Autorization :'Bearer ${token}',
                    },
                 }
            );
            console.log(res.data);
            setPasswords(res.data);
        }
  catch (err){
    console.log("ERROR:", err.response?.data || err.message);
  }};
fetchPasswords();
    }, []);
    return(
        <div>
            <h1>Dashboard </h1>
            {passwords.length === 0 ? (
                <p>No passwords saved yet.</p>
            ) : (
                passwords.map((item)=>(
                    <div key={item._id}>
                        <h3>{item.site}</h3>
                        <p>Username: {item.username}</p>
                        <p>Password: {item.password}</p>
                    </div>
                ))
            )}
        </div>
    );


    
}
export default Dashboard;