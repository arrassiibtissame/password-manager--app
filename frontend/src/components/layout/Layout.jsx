import sidebar from "./Sidebar";
function Layout({ children }) {
    return(
        <div className="flex h-screen bg-gray-950 text-white">
            {/* SIDEBARE */}
            <sidebare />
            {/* Main content */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
export default Layout;