const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  contactNumber: { type: String, required: false },
  email: { type: String, required: false },
  profileImage: { type: String, required: false },
  description: { type: String, required: true },
  workExperiences: { type: Array, required: false },
  createdDate: { type: Number, required: true },
});

module.exports = mongoose.model("Profile", profileSchema);
