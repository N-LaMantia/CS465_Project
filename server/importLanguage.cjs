const fs = require("fs");
const Language = require("./models/Language.js");
require("./index.cjs");

async function formatAllSnippets() {
  const data = fs.readFileSync("./server/data/languages.json", "utf8");
  const jsonData = JSON.parse(data);

  for (const lang of jsonData.languages) {
    await Language.findOneAndUpdate(
      { title: lang.title },
      lang,
      { upsert: true, new: true }
    );
  }

  console.log(jsonData);
}

formatAllSnippets();
