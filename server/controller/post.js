const Story = require("../models/Story");

const createPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { story, prompt, name } = req.body;

    if (!userId) {
      return res.status(404).json({ msg: "Bad Request" });
    }

    if (!story || !prompt || !name) {
      return res
        .status(400)
        .json({ msg: "Please provide a prompt,name,story" });
    }
    const newPost = new Story({
      name,
      userId,
      prompt,
      story,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Story.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const votePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId } = req.body;
    if (!postId || !userId) {
      return res.status(401).json({ msg: "Please provide postId" });
    }

    const story = await Story.findById(postId);
    if (!story) {
      return res.status(404).json({ msg: "Story doesn't exist" });
    }

    if (story.votes.includes(userId)) {
      story.votes = story.votes.filter((id) => id !== userId);
    } else {
      story.votes.push(userId);
    }

    await story.save();
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = { createPost, getPosts, votePost };
