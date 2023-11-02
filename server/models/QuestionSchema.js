const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
