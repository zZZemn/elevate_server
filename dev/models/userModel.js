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
    email: {
      type: String,
      required: [true, "Please add email"],
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
    picture: {
      type: String,
      required: [true, "Please add picture"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
