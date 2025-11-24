import fs from "fs";
import Snippet from "./models/Snippet.js";
import Language from "./models/Language.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  let data = fs.readFileSync("./server/data/snippets.json", "utf8");
  let jsonData = JSON.parse(data).snippets;
  console.log(jsonData);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      dbName: "cs465",
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
  for (const snippet of jsonData) {
    console.log(snippet);
    await Snippet.create(snippet);
  }
  console.log("All snippets inserted.");

  data = fs.readFileSync("./server/data/languages.json", "utf8");
  jsonData = JSON.parse(data).languages;
  console.log(jsonData);

  for (const language of jsonData) {
    console.log(language);
    await Language.create(language);
  }
  console.log("All languages inserted.");

  mongoose.disconnect();
})();
