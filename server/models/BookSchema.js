const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: [15, "Reached Maximum Length"],
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coverPage: { type: String }, // Optional, cover image for the book
  tableOfContents: { type: String }, // Optional
  introduction: { type: String }, // Optional
  epilogue: { type: String }, // Optional
  isPublic: { type: Boolean, default: true }, // Toggle to make the book public or private
});

module.exports = mongoose.model("Book", BookSchema);
