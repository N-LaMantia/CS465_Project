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

  const jsLang = await Language.create({
    title: "JavaScript",
    description: "Popular front-end and back-end language",
    languageType: "OOP",
  });

  await User.create({
    name: "Admin",
    password: "password",
    role: "admin",
  });

  await Snippet.create({
    title: "HelloWorld",
    description: "Prints 'Hello World'",
    language: jsLang.title,
    code: "console.log('Hello World');",
    rendered: "<pre><code>console.log('Hello World');</code></pre>",
  });

  console.log("Database seeded!");
  mongoose.disconnect();
};

seed();
