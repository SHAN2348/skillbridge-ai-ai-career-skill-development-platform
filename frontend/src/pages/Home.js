import React from "react";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        flexDirection: "column",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        SkillBridge AI 🚀
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "40px" }}>
        Smart Skill Gap Analyzer for Students
      </p>

      <div>
        <button
          style={{
            padding: "12px 30px",
            marginRight: "15px",
            fontSize: "16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#00c6ff",
            color: "white",
            cursor: "pointer"
          }}
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>

        <button
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#ff4b2b",
            color: "white",
            cursor: "pointer"
          }}
          onClick={() => (window.location.href = "/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;