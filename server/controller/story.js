const dotenv = require("dotenv");

const axios = require("axios");
dotenv.config();
const apiKey = process.env.OPENAI_KEY;
const apiUrl = "https://api.openai.com/v1/engines/davinci/completions";

const createStory = async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const story = response.data.choices[0].text;
    res.json({ story });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = createStory;
