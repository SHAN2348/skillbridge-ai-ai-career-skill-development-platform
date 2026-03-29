import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // simple validation
    if (!name || !email || !password) {
      alert("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("https://skillbridge-ai-backend-a6hr.onrender.com/signup", {
        name,
        email,
        password
      });

      alert(res.data.message || "Signup Successful ✅");

      // go to login page after signup
      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message || "Signup Failed ❌"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        
        <h3 className="text-center mb-3">Signup</h3>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;