/**
 * Script to seed the database with snippets from the JSON file
 * Run with: node seedDatabase.cjs
 */

const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Snippet = require("./models/Snippet.js");
const Language = require("./models/Language.js");
const { response } = require("./app.cjs");

dotenv.config();

const seed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      dbName: "cs465",
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Clear existing data
    await Snippet.deleteMany({});
    await Language.deleteMany({});
    console.log("Cleared existing data");

    // Read languages from JSON
    const langData = await fetch("/api/languages", "utf8");
    const langJsonData = await resp.json();

    // Create languages - handle languageType array by taking first valid element
    const validLanguageTypes = ["OOP", "Functional", "Imperative", "Logical/Declarative"];
    const languages = langJsonData.languages.map(lang => {
      let languageType = "OOP"; // default
      if (Array.isArray(lang.languageType)) {
        const validType = lang.languageType.find(t => validLanguageTypes.includes(t));
        if (validType) languageType = validType;
      } else if (validLanguageTypes.includes(lang.languageType)) {
        languageType = lang.languageType;
      }
      return {
        title: lang.title,
        description: lang.description,
        languageType: languageType,
      };
    });
    
    await Language.create(languages);
    console.log(`Created ${languages.length} languages`);

    // Read snippets from JSON
    const snippetData = fs.readFileSync("./server/data/snippets.json", "utf8");
    const snippetJsonData = JSON.parse(snippetData);

    // Create snippets with tags
    const snippets = snippetJsonData.snippets.map(snip => ({
      title: snip.title,
      description: snip.description,
      language: snip.language,
      code: snip.code,
      tags: snip.tags || [],
      rendered: `<pre><code>${snip.code}</code></pre>`,
      compatibleVersions: snip.compatibleVersions || [],
    }));

    await Snippet.create(snippets);
    console.log(`Created ${snippets.length} snippets`);

    console.log("Database seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seed();
