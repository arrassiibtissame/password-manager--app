import { useNavigate } from "react-router-dom";
function Sidebar(){
  const navigate =useNvigate();
  return (
    <div 
    style={{
      width:"220px",
      background:"#111827",
      color:"white",
      padding:"20px",
      display:"flex",
      flexDirection:"column",
      gap:"15px",

    }}
    >
      <h2>Password Manager</h2>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate ("/")}>Logout</button>
    </div>
  );
}
export default Sidebar;
