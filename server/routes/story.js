const express = require("express");
const router = express.Router();
const {
  createStory,
  getAllStories,
  getSingleStory,
  updateStory,
  deleteStory,
} = require("../controllers/story");

const { getAllQuestionsOfSingleStory } = require("../controllers/question");

router.route("/").post(createStory).get(getAllStories);
router.route("/:id").get(getSingleStory).patch(updateStory).delete(deleteStory);

router.route("/:storyId/questions").get(getAllQuestionsOfSingleStory);

module.exports = router;
