// formatCode.js
const fs = require("fs");
const prettier = require("prettier");
const { execSync } = require("child_process");
const luaFmt = require("lua-fmt");
const Snippet = require("./models/Snippet.js");
require("./index.cjs");

// Define Prettier parsers
const prettierParsers = {
  JavaScript: "babel",
  TypeScript: "typescript",
  JSON: "json",
  HTML: "html",
  CSS: "css",
  Markdown: "markdown",
};

/**
 * Format code based on language
 * @param {string} code - The code snippet
 * @param {string} language - Language of the code
 * @returns {Promise<string>} - Formatted code
 */
async function formatCode(code, language) {
  // Use Prettier if supported
  if (prettierParsers[language]) {
    try {
      return prettier.format(code, {
        parser: prettierParsers[language],
        tabWidth: 4,
        useTabs: false,
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
          `clang-format -style='{BasedOnStyle: Google, IndentWidth: 4}'`,
          { input: code }
        ).toString();

      case "Lua":
        // luaFmt is async
        return await luaFmt.formatText(code, { indent: "    " });

      default:
        return code;
    }
  } catch (err) {
    console.warn(`Could not format ${language} code:`, err.message);
    return code;
  }
}

/**
 * Example usage: format all snippets in snippets.json
 */
async function formatAllSnippets() {
  const data = fs.readFileSync("./server/data/snippets.json", "utf8");
  const jsonData = JSON.parse(data);

  for (const snippet of jsonData.snippets) {
    snippet.code = await formatCode(snippet.code, snippet.language);
    await Snippet.findOneAndUpdate(
      { title: snippet.title, language: snippet.language },
      snippet,
      { upsert: true, new: true }
    );
  }

  console.log(jsonData);
}

  formatAllSnippets();
