const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Ai-Story",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo db is connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToDb;
