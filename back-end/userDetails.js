const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    selectedTimezone: String,
    name: String,
    date: Date,
    email: { type: String, unique: true },
    password: String,
    contactNumber: Number,
    userType: String,
    gender: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsScehma);
