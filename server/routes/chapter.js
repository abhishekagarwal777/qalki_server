const express = require("express");
const router = express.Router();

const {
  createChapter,
  getAllChapters,
  getChaptersOfSingleBook,
  getSingleChapter,
  updateChapter,
  deleteChapter,
} = require("../controllers/chapter");

const { getStoriesOfSingleChapter } = require("../controllers/story");

router.route("/").post(createChapter).get(getAllChapters);
router
  .route("/:id")
  .get(getSingleChapter)
  .patch(updateChapter)
  .delete(deleteChapter);

// Get all chapter of a single book
router.route("/:chapterId/stories").get(getStoriesOfSingleChapter);

module.exports = router;
