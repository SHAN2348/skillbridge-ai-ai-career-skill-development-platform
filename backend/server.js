const Job = require("./models/Job");
const Skill = require("./models/Skill");
const authMiddleware = require("./middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("MongoDB Error ❌", err));

// test route
app.get("/", (req, res) => {
  res.send("SkillBridge AI Backend is Running 🚀");
});


// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ❌"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student"
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully ✅"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Signup Error ❌"
    });
  }
});


// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password ❌"
      });
    }

    // create token (id + role)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful ✅",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login Error ❌"
    });
  }
});


// ================= DASHBOARD =================
app.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to Dashboard 🎉");
});


// ================= ADD SKILL =================
app.post("/add-skill", authMiddleware, async (req, res) => {
  try {

    const { skillName, level } = req.body;

    const newSkill = new Skill({
      userId: req.user.id,
      skillName,
      level
    });

    await newSkill.save();

    res.status(201).json({
      message: "Skill Added Successfully ✅"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding skill ❌"
    });
  }
});


// ================= GET SKILLS =================
app.get("/my-skills", authMiddleware, async (req, res) => {
  try {

    const skills = await Skill.find({ userId: req.user.id });

    res.status(200).json(skills);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching skills ❌"
    });
  }
});


// ================= DELETE SKILL =================
app.delete("/delete-skill/:id", authMiddleware, async (req, res) => {
  try {

    await Skill.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.status(200).json({
      message: "Skill deleted successfully ✅"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting skill ❌"
    });
  }
});


// ================= ADD JOB ROLE (ADMIN ONLY) =================
app.post("/add-job", authMiddleware, async (req, res) => {
  try {

    // only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can add job roles ❌"
      });
    }

    const { jobTitle, requiredSkills } = req.body;

    // check duplicate job
    const existingJob = await Job.findOne({ jobTitle });

    if (existingJob) {
      return res.status(400).json({
        message: "Job role already exists ❌"
      });
    }

    const newJob = new Job({
      jobTitle,
      requiredSkills
    });

    await newJob.save();

    res.status(201).json({
      message: "Job Role Added Successfully ✅"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding job role ❌"
    });
  }
});


// ================= SKILL GAP ANALYZER =================
app.get("/skill-gap/:jobTitle", authMiddleware, async (req, res) => {
  try {

    const job = await Job.findOne({ jobTitle: req.params.jobTitle });

    if (!job) {
      return res.status(404).json({
        message: "Job role not found ❌"
      });
    }

    const studentSkills = await Skill.find({ userId: req.user.id });

    const studentSkillNames = studentSkills.map(skill =>
      skill.skillName.toLowerCase()
    );

    const missingSkills = job.requiredSkills.filter(skill =>
      !studentSkillNames.includes(skill.toLowerCase())
    );

    res.json({
      job: job.jobTitle,
      missingSkills
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error analyzing skill ❌"
    });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
})