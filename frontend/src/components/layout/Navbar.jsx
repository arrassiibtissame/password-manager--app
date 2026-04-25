import Button from "../ui/Button";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";

function Navbar(){
    const {logout} =useContext (AuthContext);
    return(
       <header className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
        {/*left side*/}
        <div className="flex items-center gap-2">
            <div className= "w-8 h-8 bg-black rounded-md"></div>
            <span className ="font-semibold text-lg text-gray-800">
                Password Manager 
                </span>
                </div>

                {/*right side*/}
                <div className= "flex items-center gap-3">
                    <Button onClick={logout} variant="secondary">
                        Lougout </Button>

                        </div>
                        </header>
    )
}
export default Navbar;