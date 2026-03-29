import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // FETCH SKILLS FUNCTION
  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        "https://skillbridge-ai-backend-a6hr.onrender.com/my-skills",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSkills(res.data);
    } catch (error) {
      alert("Failed to fetch skills");
    }
  };

  // FIXED useEffect (this was causing Netlify error)
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchSkills();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // important fix

  // ADD SKILL
  const addSkill = async () => {
    if (!skillName || !level) {
      alert("Please enter skill and level");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://skillbridge-ai-backend-a6hr.onrender.com/add-skill",
        { skillName, level },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSkillName("");
      setLevel("");
      fetchSkills();
    } catch (error) {
      alert("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  // DELETE SKILL
  const deleteSkill = async (id) => {
    try {
      await axios.delete(
        `https://skillbridge-ai-backend-a6hr.onrender.com/delete-skill/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSkills();
    } catch (error) {
      alert("Failed to delete skill");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center mb-4">Student Dashboard</h2>

        {/* ADD SKILL */}
        <div className="card p-4 shadow mb-4">
          <h4 className="mb-3">Add New Skill</h4>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Skill Name"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />

          <select
            className="form-control mb-3"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button
            className="btn btn-primary"
            onClick={addSkill}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Skill"}
          </button>
        </div>

        {/* SKILLS LIST */}
        <div className="card p-4 shadow">
          <h4 className="mb-3">Your Skills</h4>

          {skills.length === 0 ? (
            <p>No skills added yet</p>
          ) : (
            skills.map((skill) => (
              <div
                key={skill._id}
                className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
              >
                <div>
                  <strong>{skill.skillName}</strong> — {skill.level}
                </div>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteSkill(skill._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
