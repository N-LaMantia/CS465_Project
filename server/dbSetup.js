import mongoose from "mongoose";
import dotenv from "dotenv";
import Language from "./models/Language.js";
import Snippet from "./models/Snippet.js";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  dbName: "cs465",
  useUnifiedTopology: true,
});

const seed = async () => {
  await Language.deleteMany({});
  await Snippet.deleteMany({});
  await User.deleteMany({});
  mongoose.disconnect();
};

seed();
