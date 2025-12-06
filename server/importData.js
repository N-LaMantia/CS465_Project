const fs = require("fs");

const data = fs.readFileSync("./data/snippets.json", "utf8");
const jsonData = JSON.parse(data);
console.log(jsonData);
