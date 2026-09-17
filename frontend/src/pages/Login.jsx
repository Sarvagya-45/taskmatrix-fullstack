import { useState } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";
import Toast from "../components/Toast.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // INPUT CHANGE
  // ===============================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // ===============================
  // LOGIN
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(formData.email, formData.password);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-glow auth-glow-one"></div>
        <div className="auth-glow auth-glow-two"></div>
      </div>

      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-brand-mark">T</div>

          <div>
            <h1>TaskMatrix</h1>
            <p>Productivity Workspace</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-eyebrow">WELCOME BACK</span>

            <h2>Sign in</h2>

            <p>Continue managing your work and tasks.</p>
          </div>

          {error && <Toast message={error} type="error" />}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span>Don't have an account?</span>

            <Link to="/register">Create account</Link>
          </div>
        </div>

        <p className="auth-copyright">
          TaskMatrix • Fullstack Productivity Platform
        </p>
      </div>
    </div>
  );
};

export default Login;
