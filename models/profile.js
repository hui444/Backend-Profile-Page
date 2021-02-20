const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  contact: { type: String, required: false },
  email: { type: String, required: false },
  profilePhoto: { type: String, required: false },
  workExperiences: { type: Array, required: false },
});

module.exports = mongoose.model("Profile", profileSchema);