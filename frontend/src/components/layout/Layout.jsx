import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout ({children}){
    return (
        
            <div className= "min-h-screen bg-gray-50">
                <Navbar/>
                <main className= "p-6"> {children} </main>
            </div>
       
    );
}
export default Layout ;