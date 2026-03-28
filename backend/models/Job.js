const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  requiredSkills: [String]
});

module.exports = mongoose.model("Job", jobSchema);