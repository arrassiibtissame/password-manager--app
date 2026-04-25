import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout  ({ children}){
    return(
        <div className="app-container">
            <Sidebar />
            <div className="main-section">
                <Navbar />
                <div className= "page-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
export default Layout ;