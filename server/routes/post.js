const express = require("express");
const { createPost, getPosts, votePost } = require("../controller/post");

const router = express.Router();

router.route("/:userId/story").post(createPost);
router.route("/stories").get(getPosts);
router.route("/:postId/vote").patch(votePost);

module.exports = router;
