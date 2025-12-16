/**
 * This file seeds the database from the models
 *
 * @file
 * @author Thomas Gallaher
 * Contributors:
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Language = require("./models/Language.js");
const Snippet = require("./models/Snippet.js");
const User = require("./models/User.js");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  dbName: "cs465",
  useUnifiedTopology: true,
});

// Seed database and delete all data
const seed = async () => {
  await Language.deleteMany({});
  await Snippet.deleteMany({});
  await User.deleteMany({});

  console.log("Database seeded!");
  mongoose.disconnect();
};

seed();
