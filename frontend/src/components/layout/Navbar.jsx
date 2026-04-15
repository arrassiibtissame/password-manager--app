import {useAuth} from "../../hooks/useAuth";

function Navbar() {
    const { logout } = useAuth();
    return (
        <div className ="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-gray-400 text-sm">
                    Welcome Back
                </h2>
                <p className="text-gray-400 text-sm">
                    Manage your passwords safely
                </p>
            </div>
            <div className="flex items-center gap-3">
                {/*Fake Avatar*/}
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          U
        </div>
        <button onClick ={logout}
        className="bg-red-600 px-3 py-1 rounded">Logout</button>
            </div>
        </div>
    );
}
export default Navbar;