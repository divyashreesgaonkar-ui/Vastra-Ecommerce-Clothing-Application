import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../../styles/auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin
      ? "http://localhost:8081/api/auth/login"
      : "http://localhost:8081/api/auth/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        login(false); // USER login
        navigate("/home");
      } else {
        const msg = await response.text();
        setError(msg || "Operation failed");
      }
    } catch (err) {
      console.error(err);
      setError("Backend not reachable");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="brand-title">Vasthra</h1>

      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">{isLogin ? "Login" : "Create Account"}</h2>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="auth-input"
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="auth-input"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="auth-input"
                onChange={handleChange}
                required
              />
            )}

            <button type="submit" className="auth-button">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Register" : " Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
