import React, { useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const addJob = async () => {
    if (!jobTitle || !skills) {
      alert("Enter job title and required skills");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://skillbridge-ai-backend-a6hr.onrender.com/add-job",
        {
          jobTitle,
          requiredSkills: skills.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job role added successfully!");
      setJobTitle("");
      setSkills("");

    } catch (error) {
      alert("Only admin can add job roles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h3>SkillBridge AI</h3>
        <hr />
        <p>Dashboard</p>
        <p>Add Job Roles</p>
        <p>Students</p>
        <p>Analytics</p>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-5 bg-light">
        <h2 className="mb-4">Admin Dashboard</h2>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h4>Total Students</h4>
              <h2>120</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h4>Job Roles</h4>
              <h2>25</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h4>Skills Added</h4>
              <h2>450</h2>
            </div>
          </div>
        </div>

        {/* Add Job Role Card */}
        <div className="card shadow p-4">
          <h4 className="mb-3">Add New Job Role</h4>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Job Title (Example: MERN Developer)"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Required Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <button
            className="btn btn-dark"
            onClick={addJob}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Job Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;