import { useState } from "react";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";
import Toast from "../components/Toast.jsx";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  // REGISTER
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register(name, email, password);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";

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
        {/* BRAND */}

        <div className="auth-brand">
          <div className="auth-brand-mark">T</div>

          <div>
            <h1>TaskMatrix</h1>
            <p>Productivity Workspace</p>
          </div>
        </div>

        {/* CARD */}

        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-eyebrow">GET STARTED</span>

            <h2>Create account</h2>

            <p>Create your workspace and start managing your tasks.</p>
          </div>

          {error && <Toast message={error} type="error" />}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* NAME */}

            <div className="form-group">
              <label htmlFor="name">Full name</label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

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
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
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
                "Creating account..."
              ) : (
                <>
                  Create account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}

          <div className="auth-footer">
            <span>Already have an account?</span>

            <Link to="/login">Sign in</Link>
          </div>
        </div>

        <p className="auth-copyright">
          TaskMatrix • Fullstack Productivity Platform
        </p>
      </div>
    </div>
  );
};

export default Register;
