const Book = require("../models/BookSchema");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { Query } = require("mongoose");

// Create a new book
const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      coverPage,
      tableOfContents,
      introduction,
      epilogue,
      isPublic,
    } = req.body;
    const book = new Book({
      title,
      author,
      coverPage,
      tableOfContents,
      introduction,
      epilogue,
      isPublic,
    });
    const savedBook = await book.save();
    res.status(StatusCodes.CREATED).json(savedBook);
  } catch (error) {
    console.error(error); // Log the actual error for debugging purposes

    if (error.name === "ValidationError") {
      // Handle validation errors
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }

    // Handle other error cases
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create the book." });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const { isPublic, title, author } = req.query;
    QueryObject = {};

    if (isPublic) {
      QueryObject.isPublic = isPublic;
    }

    if (title) {
      QueryObject.title = { $regex: title, $options: "i" };
    }

    const books = await Book.find(QueryObject);
    res.status(StatusCodes.OK).json({ books, count: books.length });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve books." });
  }
};

// Get a single book by ID
const getSingleBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      throw new NotFoundError(`No book with id ${bookId}`);
    }
    res.json(book);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve the book." });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete({ _id: bookId });
    if (!book) {
      throw new NotFoundError(`No book with id ${bookId}`);
    }
    res.status(StatusCodes.OK).send("Book deleted successfully");
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete the book." });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updates = req.body;
    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {
      new: true,
    });
    if (!updatedBook) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Book not found." });
    }
    res.json(updatedBook);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update the book." });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
};
