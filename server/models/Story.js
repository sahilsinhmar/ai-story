const mongoose = require("mongoose");

const postStorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please provide userId"],
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    prompt: {
      type: String,
      required: [true, "Please provide a prompt"],
    },
    story: {
      type: String,
      required: [true, "Please proivde the story generated"],
    },
    votes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Story = mongoose.models.story || mongoose.model("story", postStorySchema);

module.exports = Story;
