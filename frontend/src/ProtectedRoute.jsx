import {useContext} from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
    const { token } = useContext(AuthContext);
    if (!token) 
        return <Navigate to="/" />;
          return children;
    }
  export default ProtectedRoute;