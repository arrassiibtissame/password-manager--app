import {navigate} from "react-router-dom";
function ProtectedRoute ({children}){
    const token = localStorage.getItem("token");
    if (!token){
        alert("Please login to access this page");
        navigate("/");
        return null;
    }
    return children;

}
export default ProtectedRoute;