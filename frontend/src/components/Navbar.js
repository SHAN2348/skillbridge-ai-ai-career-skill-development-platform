import React from "react";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">SkillBridge AI</span>

      <div>
        <button
          className="btn btn-outline-light me-2"
          onClick={() => window.location.href = "/dashboard"}
        >
          Dashboard
        </button>

        <button
          className="btn btn-outline-light me-2"
          onClick={() => window.location.href = "/skill-gap"}
        >
          Skill Gap
        </button>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;