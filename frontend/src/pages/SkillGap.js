import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SkillGap() {
  const [jobTitle, setJobTitle] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const analyzeSkills = async () => {
    if (!jobTitle) {
      alert("Please enter a job role");
      return;
    }

    try {
      setLoading(true);

      // get token safely
      const token = localStorage.getItem("token");

      // if token not found → redirect to login
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/skill-gap/${jobTitle}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setMissingSkills(res.data.missingSkills || []);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Failed to analyze skill gap");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Skill Gap Analyzer</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter Job Role (e.g., Full Stack Developer)"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <button
        className="btn btn-primary mb-4"
        onClick={analyzeSkills}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Skill Gap"}
      </button>

      <h3>Missing Skills</h3>

      {missingSkills.length === 0 ? (
        <p>No missing skills found</p>
      ) : (
        missingSkills.map((skill, index) => (
          <p key={index}>{skill}</p>
        ))
      )}
    </div>
  );
}

export default SkillGap;