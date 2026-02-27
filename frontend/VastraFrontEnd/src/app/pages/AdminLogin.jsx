import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../../styles/adminlogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useApp(); //IMPORTANT
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //TELL CONTEXT ADMIN IS LOGGED IN
        login(true); // true → admin
        localStorage.setItem("role", "ADMIN");

        navigate("/admin"); //matches App.jsx route
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* BRAND TITLE */}
      <h1 className="text-3xl font-bold mb-6">Vasthra</h1>

      {/* CARD */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-6 p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
