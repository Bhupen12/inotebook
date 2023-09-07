const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongo;
