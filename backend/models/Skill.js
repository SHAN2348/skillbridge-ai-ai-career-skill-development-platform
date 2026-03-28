const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  userId: String,
  skillName: String,
  level: String
});

module.exports = mongoose.model("Skill", skillSchema);