const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    category: {
      type: Number,
      default: 0,
    },
    specifiedDate: {
      type: String,
    },
    importance: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = { Schedule };
