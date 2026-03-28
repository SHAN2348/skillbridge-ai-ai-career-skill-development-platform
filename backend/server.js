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
  res.send("SkillBridge AI Backend is Running");
});


// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup Error ❌" });
  }
});


// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    // JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful ✅",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login Error ❌" });
  }
});


// ================= DASHBOARD =================
app.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to Student Dashboard 🎉");
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

    res.status(201).json({ message: "Skill Added Successfully ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding skill ❌" });
  }
});


// ================= GET SKILLS =================
app.get("/my-skills", authMiddleware, async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user.id });

    res.status(200).json(skills);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching skills ❌" });
  }
});


// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    // add job roles
    app.post("/add-job", async (req, res) => {
  try {

    const { jobTitle, requiredSkills } = req.body;

    const newJob = new Job({
      jobTitle,
      requiredSkills
    });

    await newJob.save();

    res.send("Job Role Added");

  } catch (error) {
    console.log(error);
    res.send("Error adding job role");
  }
});
    //Skill Gap Analyzer API
    app.get("/skill-gap/:jobTitle", authMiddleware, async (req, res) => {
  try {

    const job = await Job.findOne({ jobTitle: req.params.jobTitle });

    const studentSkills = await Skill.find({ userId: req.user.id });

    const studentSkillNames = studentSkills.map(skill => skill.skillName);

    const missingSkills = job.requiredSkills.filter(
      skill => !studentSkillNames.includes(skill)
    );

    res.json({
      job: job.jobTitle,
      missingSkills
    });

  } catch (error) {
    console.log(error);
    res.send("Error analyzing skill gap");
  }
});