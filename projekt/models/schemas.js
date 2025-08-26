const mongoose = require("mongoose");

// för alla som inte reg
const visitSchema = new mongoose.Schema({
  fingerprint: { type: String, required: true, unique: true },
  influencer: String,
  source: String,
  timestamp: { type: Date, default: Date.now }
});

// för all som reg
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  influencer: String,
  source: String,
  registered_at: { type: Date, default: Date.now }
});

const Visit = mongoose.model("Visit", visitSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Visit, User };
