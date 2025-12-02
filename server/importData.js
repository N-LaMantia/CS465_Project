import fs from "fs";
import Snippet from "./models/Snippet.js";
import Language from "./models/Language.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import prettier from "prettier";
import { execSync } from "child_process";

dotenv.config();

const prettierParsers = {
  JavaScript: "babel",
  TypeScript: "typescript",
  JSON: "json",
  HTML: "html",
  CSS: "css",
  Markdown: "markdown",
};

export function formatCode(code, language) {
  // Use Prettier if supported
  if (prettierParsers[language]) {
    try {
      return prettier.format(code, {
        parser: prettierParsers[language],
        tabWidth: 4, // <— use 4 spaces
        useTabs: false, // optional: make sure tabs are not used
      });
    } catch {
      return code;
    }
  }

  // Use command-line tools for other languages
  try {
    switch (language) {
      case "Python":
        return execSync(`black -q -`, { input: code }).toString();
      case "C":
      case "C++":
        return execSync(
          `clang-format -style="{BasedOnStyle: Google, IndentWidth: 4, BreakBeforeBraces: Allman, ColumnLimit: 80}"`,
          { input: code },
        ).toString();
      case "Lua":
        return luaFmt.formatText(code, {
          indent: "    ", // 4 spaces
          columnWidth: 80, // wrap lines at 80 chars
          breaks: true, // force newlines where possible
          callArgAlign: true, // optionally align function arguments
          tableAlign: true, // optionally align tables
        });
      default:
        return code;
    }
  } catch (err) {
    return code; // fallback if formatting fails
  }
}

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
  for (const snip of jsonData) {
    try {
      snip.code = await formatCode(snip.code, snip.language);
    } catch (err) {
      console.log(snip);
      console.log(err);
    }
    await Snippet.create(snip);
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
