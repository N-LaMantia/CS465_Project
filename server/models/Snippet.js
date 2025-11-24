import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  language: { type: String, required: true },
  code: { type: String, required: true },
  compatibleVersions: { type: [String], default: [] },
});

export default mongoose.model("Snippet", snippetSchema);
