import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

function Layout({ children }) {
  return (
    <div className="app-container">
      {/* Sidebar — visible on desktop only */}
      <Sidebar />

      <div className="main-section">
        <Navbar />
        <div className="page-content">
          {children}
        </div>
      </div>

      {/* Bottom nav — visible on mobile only */}
      <BottomNav />
    </div>
  );
}

export default Layout;