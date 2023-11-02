const { StatusCodes } = require("http-status-codes");
const Question = require("../models/QuestionSchema");
const Story = require("../models/StorySchema");

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(StatusCodes.CREATED).json({ question });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create the question." });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const { isPublic, question } = req.query;
    queryObject = {};
    if (isPublic) {
      queryObject.isPublic = isPublic;
    }
    if (question) {
      queryObject.question = question;
    }

    const questions = await Question.find(queryObject);
    res.json({ questions, count: questions.length });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve questions." });
  }
};

// Get a single question by ID
const getSingleQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Question not found." });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve the question." });
  }
};

//getAllQuestions from story with {ID}
const getAllQuestionsOfSingleStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;

    // Check if the story exists
    const story = await Story.findById(storyId);
    if (!story) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Story with this ID doesn't exist." });
    }

    // Fetch questions if the story exists
    const questions = await Question.find({ storyId });
    res.json({ questions, count: questions.length });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve questions of the story." });
  }
};

// Update a question by ID
const updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const updates = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updates,
      { new: true }
    );
    if (!updatedQuestion) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Question not found." });
    }
    res.status(StatusCodes.OK).send("question updated successfully");
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update the question." });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const deletedQuestion = await Question.findByIdAndRemove(questionId);
    if (!deletedQuestion) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Question not found." });
    }
    res.status(StatusCodes.OK).send("question deleted successfully");
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete the question." });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestionsOfSingleStory,
};
