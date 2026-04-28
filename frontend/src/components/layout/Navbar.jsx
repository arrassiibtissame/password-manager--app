import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="navbar">
      <div className="navbar-left">
        <p className="navbar-title">My Vault</p>
      </div>
      <div className="navbar-right">
        <div className="avatar" title={user?.username}>
          {initials}
        </div>
        {user?.username && (
          <span className="navbar-username">{user.username}</span>
        )}
      </div>
    </div>
  );
}

export default Navbar;