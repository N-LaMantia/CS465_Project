import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Language from "./models/Language.js";
import Snippet from "./models/Snippet.js";
import User from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cors());

// example route
app.get("/api", (req, res) => {
  res.send("API is running");
});

app.get("/api/languages", async (req, res) => {
  try {
    const languages = await Language.find({});
    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving languages" });
  }
});

app.get("/api/languages/:snippet", async (req, res) => {
  try {
    const snippets = await Snippet.find({ title: req.params.snippet });
    const languages = [...new Set(snippets.map((s) => s.language))];
    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving languages" });
  }
});

app.get("/api/snippets", async (req, res) => {
  try {
    const snippets = await Snippet.find({});
    res.json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving snippets" });
  }
});

app.get("/api/snippets/:language", async (req, res) => {
  try {
    const snippets = await Snippet.find({ language: req.params.language });
    res.json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving snippets" });
  }
});

export default app;
