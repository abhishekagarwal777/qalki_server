const { StatusCodes } = require("http-status-codes");
const Chapter = require("../models/ChapterSchema");
const Book = require("../models/BookSchema");

// Create a new chapter
const createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create(req.body);
    res.status(StatusCodes.CREATED).json({ chapter });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create the chapter." });
  }
};

// Get all chapters
const getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.json(chapters);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve chapters." });
  }
};

//getChapters of a book with {ID}
const getChaptersOfSingleBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Book with this ID doesn't exist." });
    }

    // Fetch chapters if the book exists
    const chapters = await Chapter.find({ book: bookId });
    res.json(chapters);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve chapters of the book." });
  }
};

// Get a single chapter by ID
const getSingleChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Chapter not found." });
    }
    res.json(chapter);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve the chapter." });
  }
};

// Update a chapter by ID
const updateChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const updates = req.body;
    const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, updates, {
      new: true,
    });
    if (!updatedChapter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Chapter not found." });
    }
    res.json(updatedChapter);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update the chapter." });
  }
};

// Delete a chapter by ID
const deleteChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const deletedChapter = await Chapter.findByIdAndDelete({ _id: chapterId });
    if (!deletedChapter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Chapter not found." });
    }
    res.status(StatusCodes.OK).send("chapter deleted");
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete the chapter." });
  }
};

module.exports = {
  createChapter,
  getAllChapters,
  getChaptersOfSingleBook,
  getSingleChapter,
  updateChapter,
  deleteChapter,
};
