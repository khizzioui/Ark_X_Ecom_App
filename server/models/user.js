const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  city: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  phoneNumber: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  profileImagePath: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
