const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  option: {
    type: String,
    default: "Progress",
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("task", taskSchema);
