import {
  CheckSquare,
  LayoutDashboard,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div>
          <span className="sidebar-label">WORKSPACE</span>
          <h2>TaskMatrix</h2>
        </div>

        <button
          type="button"
          className="sidebar-close"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-ai">
        <div className="sidebar-ai-icon">
          <Sparkles size={18} />
        </div>

        <div>
          <strong>AI Assistant</strong>
          <span>Plan your work smarter</span>
        </div>
      </div>

      <div className="sidebar-bottom">
        <button type="button" className="sidebar-logout" onClick={logout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
