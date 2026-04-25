import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
function Splash(){
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => 
        {
            navigate ("/login");
        },2000);
return () => clearTimeout(timer);
    },[]);
    return(
        <div className="splash-container">
            <h1 className ="logo">Password manager</h1>
            <p> Loding your passwords safely... </p>
            </div>
    );
    
}
export default Splash ;