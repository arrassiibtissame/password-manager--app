import {useNavigate} from"react-router-dom";
import { useAuth } from "../../hooks/useAuth";
function Sidebar() {
const navigate = useNavigate();
const { logout } = useAuth();
const handleLogout = () => {
logout();
navigate("/");
};
return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 p-5 flex flex-col">
        {/* Logo */}
        <h1 className="text-2xl front-bold mb-8">MyVault</h1>
        {/* Navigation */}
        <button 
        onClick={()=> navigate("/dashboard")}
        className="text-left p-2 rounded hover:bg-gray-800"> Dashboard</button>
        
        <button 
        onClick={()=> navigate ("/dashboard")}
        className="text-left p-2 rounded hover:bg-gray-800">Paswwords</button>
        <button
         className="text-left p-2 rounded hover:bg-gray-800"
      >
        Settings
      </button>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;