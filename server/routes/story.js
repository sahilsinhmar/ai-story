const express = require("express");
const createStory = require("../controller/story");
const router = express.Router();

router.route("/generate-story").post(createStory);

module.exports = router;
