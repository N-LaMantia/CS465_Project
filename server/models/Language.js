import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  languageType: {
    type: [String],
    enum: [
      "OOP",
      "Functional",
      "Imperative",
      "Declarative",
      "Procedural",
      "Event-driven",
      "Generic",
    ],
    required: true,
  },
  environments: { type: [String], required: true },
});

export default mongoose.model("Language", languageSchema);
