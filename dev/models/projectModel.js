const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
