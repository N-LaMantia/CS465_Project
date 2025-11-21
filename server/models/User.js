import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  preferredLanguage: { type: String, default: "" },
  preferredTheme: { type: String, default: "dark" },
  favoritedSnippets: { type: [String], default: [] },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  settings: { type: settingsSchema, default: () => ({}) },
});

export default mongoose.model("User", userSchema);
