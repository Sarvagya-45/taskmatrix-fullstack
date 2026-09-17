import { LogOut, Menu, UserCircle } from "lucide-react";

import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="navbar-brand">
          <div className="brand-mark">T</div>

          <div>
            <h1>TaskMatrix</h1>
            <span>Productivity Workspace</span>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <UserCircle size={22} />

          <div>
            <strong>{user?.name || "User"}</strong>
            <span>{user?.email || ""}</span>
          </div>
        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={logout}
          title="Logout"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
