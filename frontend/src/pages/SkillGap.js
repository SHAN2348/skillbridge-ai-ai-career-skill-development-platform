import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SkillGap() {
  const [jobTitle, setJobTitle] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ================= ROADMAP GENERATOR =================
  const generateRoadmap = (skills) => {
    // 🔴 FIX: handle empty skills
    if (!skills || skills.length === 0) return [];

    const roadmapData = [];

    for (let i = 0; i < 30; i++) {
      const skill = skills[i % skills.length];

      roadmapData.push({
        day: `Day ${i + 1}`,
        task: `Learn ${skill} + Practice 2 coding problems`,
      });
    }

    return roadmapData;
  };

  // ================= SKILL ANALYZER =================
  const analyzeSkills = async () => {
    if (!jobTitle) {
      alert("Please enter a job role");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `https://skillbridge-ai-backend-a6hr.onrender.com/skill-gap/${jobTitle}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const skills = res.data.missingSkills || [];

      setMissingSkills(skills);

      // generate roadmap safely
      const roadmapData = generateRoadmap(skills);
      setRoadmap(roadmapData);

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
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Skill Gap Analyzer</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Job Role (Example: MERN Developer)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <button
          className="btn btn-dark w-100 mb-4"
          onClick={analyzeSkills}
          disabled={loading}
        >
          {loading ? "Analyzing Skills..." : "Analyze Skill Gap"}
        </button>

        {/* ================= MISSING SKILLS ================= */}

        {missingSkills.length > 0 ? (
          <div className="mb-4">
            <h4>Missing Skills</h4>

            <div className="row">
              {missingSkills.map((skill, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card p-3 shadow-sm text-center">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center">No missing skills 🎉</p>
        )}

        {/* ================= ROADMAP ================= */}

        {roadmap.length > 0 && (
          <div>
            <h4 className="mb-3">30-Day Learning Roadmap</h4>

            {roadmap.map((item, index) => (
              <div key={index} className="border rounded p-2 mb-2">
                <strong>{item.day}</strong> — {item.task}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillGap;