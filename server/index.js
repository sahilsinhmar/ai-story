const bodyParser = require("body-parser");
const express = require("express");
const aiRouter = require("../server/routes/story");
const story = require("../server/routes/post");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDb = require("../server/utils/connect");

const app = express();

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/story", story);

const port = 3001;

const start = async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log("server is listening on port 3001");
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
