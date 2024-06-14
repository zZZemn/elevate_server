const mongoose = require("mongoose");

const professionSchema = mongoose.Schema(
  {
    profession: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profession", professionSchema);
