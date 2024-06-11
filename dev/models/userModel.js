const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add first name"],
    },
    profession: {
      type: String,
      required: [true, "Please add profession"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
