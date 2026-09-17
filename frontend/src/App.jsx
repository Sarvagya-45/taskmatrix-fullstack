import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import useAuth from "./hooks/useAuth.js";

import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Tasks from "./pages/Tasks.jsx";
import NotFound from "./pages/NotFound.jsx";

// ===============================
// PROTECTED ROUTE
// ===============================

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ===============================
// PUBLIC ROUTE
// ===============================

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// ===============================
// PROTECTED LAYOUT
// ===============================

const ProtectedLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />

      <div className="app-content">
        <Sidebar />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

// ===============================
// APP
// ===============================

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* =========================
            PROTECTED ROUTES
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Tasks />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* =========================
            DEFAULT ROUTE
        ========================= */}

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* =========================
            404
        ========================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
