const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/question");

router.route("/").post(createQuestion).get(getAllQuestions);
router
  .route("/:id")
  .get(getSingleQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

// Get all chapter of a single book

module.exports = router;
