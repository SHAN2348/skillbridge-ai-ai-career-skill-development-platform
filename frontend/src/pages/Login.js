import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "https://skillbridge-ai-backend-a6hr.onrender.com/login",
      {
        email,
        password,
      }
    );
    console.log(res.data);  //add line

    // store token
    localStorage.setItem("token", res.data.token);

    // store name
    localStorage.setItem("username", res.data.user.name);

    // store role
    localStorage.setItem("role", res.data.user.role);

    alert("Login Successful");

    // ===== ROLE BASED REDIRECT =====
    if (res.data.user.role === "admin") {
      navigate("/admin-dashboard");
    } else if (res.data.user.role === "student") {
      navigate("/dashboard");
    } else {
      navigate("/dashboard"); // fallback
    }

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
