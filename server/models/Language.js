const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  languageType: {
    type: [String],
    enum: ["OOP", "Functional", "Imperative", "Logical/Declarative"],
    required: true,
  },
});

module.exports = mongoose.model("Language", languageSchema);
