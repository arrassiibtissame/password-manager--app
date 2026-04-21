import sidebare from "./Sidebar";
import Navbar from "./Navbar";

function Layout ({children}){
    return (
        <div style={ { display: "flex"}}>
            <sidebare/>
            <div style= {{flex:1}}>
                <Navbar/>
                <div style={{padding:"20px"}}></div>
            </div>
        </div>
    );
}
export default Layout ;