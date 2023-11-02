const { StatusCodes } = require("http-status-codes");
const Story = require("../models/StorySchema");
const Chapter = require("../models/ChapterSchema");

// Create a new story
const createStory = async (req, res) => {
  try {
    const story = await Story.create(req.body);
    res.status(StatusCodes.CREATED).json({ story });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create the story." });
  }
};

// Get all stories
const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.json({ stories, count: stories.length });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve stories." });
  }
};

// Get a single story by ID
const getSingleStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    const story = await Story.findById(storyId);
    if (!story) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Story not found." });
    }
    res.json(story);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve the story." });
  }
};

//get all stories of a chapter with {ID}
const getStoriesOfSingleChapter = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;

    // Check if the chapter exists
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Chapter with this ID doesn't exist." });
    }

    // Fetch stories if the chapter exists
    const stories = await Story.find({ chapter: chapterId });
    if (!stories || stories.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Story not found for this chapter." });
    }
    res.json({ stories, count: stories.length });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve stories of the chapter." });
  }
};

// Update a story by ID
const updateStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    const updates = req.body;
    const updatedStory = await Story.findByIdAndUpdate(storyId, updates, {
      new: true,
    });
    if (!updatedStory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Story not found." });
    }
    res.status(StatusCodes.OK).send("story updated successfully");
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update the story." });
  }
};

// Delete a story by ID
const deleteStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    const deletedStory = await Story.findByIdAndRemove(storyId);
    if (!deletedStory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Story not found." });
    }
    res.status(StatusCodes.OK).send("story deleted successfully");
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete the story." });
  }
};

module.exports = {
  createStory,
  getAllStories,
  getSingleStory,
  updateStory,
  deleteStory,
  getStoriesOfSingleChapter,
};
