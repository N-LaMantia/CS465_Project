const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  language: { type: String, required: true },
  rendered: { type: String, required: true },
  code: { type: String, required: true },
  compatibleVersions: { type: [String], default: [] },
});

module.exports = mongoose.model("Snippet", snippetSchema);
