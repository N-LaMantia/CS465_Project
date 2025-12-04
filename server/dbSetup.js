/**
 * This file seeds the database from the models
 *
 * @file
 * @author Thomas Gallaher
 * Contributors:
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Language from "./models/Language.js";
import Snippet from "./models/Snippet.js";
import User from "./models/User.js";

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
