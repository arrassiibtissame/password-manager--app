import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout ({children}){
    return (
        <div style={ { display: "flex"}}>
            <Sidebar/>
            <div style= {{flex:1}}>
                <Navbar/>
                <main style={{padding:"20px"}}> {children} </main>
            </div>
        </div>
    );
}
export default Layout ;