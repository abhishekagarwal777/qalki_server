const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  title: { type: String, required: true },
  cover: String, // Optional, cover image for the chapter
});

module.exports = mongoose.model("Chapter", ChapterSchema);
