const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  content: { type: String, required: true },
  quotes: [String], // Optional, if you want to include quotes
});

module.exports = mongoose.model("Story", StorySchema);
