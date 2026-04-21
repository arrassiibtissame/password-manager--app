import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";

function Navbar(){
    const {user} =useContext (AuthContext);
    return(
        <div 
        style ={{
            height: "60px",
            background:"#1f2937",
            color:"white",
            display:"flex",
            alignItems:"center",
            padding:"0 20px",
            justifyContent:"space-between",

        }}>
            <h3>Dashboard</h3>
            <span> Welcome {user?.name || "User"}</span>

        </div>
    );
}
export default Navbar;