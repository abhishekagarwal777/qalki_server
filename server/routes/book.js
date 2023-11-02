const express = require("express");
const router = express.Router();

const {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
} = require("../controllers/book");

const { getChaptersOfSingleBook } = require("../controllers/chapter");

router.route("/").post(createBook).get(getAllBooks);
router.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);

router.route("/:bookId/chapter").get(getChaptersOfSingleBook);

module.exports = router;
