import { createContext, useEffect, useState } from "react";

import api from "../services/api.js";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // GET CURRENT USER
  // ===============================

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/api/auth/me");

      setUser(response.data.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // REGISTER
  // ===============================

  const register = async (name, email, password) => {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    const { user, token } = response.data.data;

    localStorage.setItem("token", token);

    setUser(user);

    return response.data;
  };

  // ===============================
  // LOGIN
  // ===============================

  const login = async (email, password) => {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    const { user, token } = response.data.data;

    localStorage.setItem("token", token);

    setUser(user);

    return response.data;
  };

  // ===============================
  // LOGOUT
  // ===============================

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ===============================
  // LOAD USER ON APP START
  // ===============================

  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
