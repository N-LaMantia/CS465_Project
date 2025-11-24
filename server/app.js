import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Language from "./models/Language.js";
import Snippet from "./models/Snippet.js";
import User from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cors());

const cacheTimeout = 60 * 60 * 1000;

let cache = {
  languages: {
    retrieveTime: 0,
    languages: [],
  },
  snippets: {
    retrieveTime: 0,
    snippets: [], // full list of fetched snippets
    byTitle: new Map(), // snippet title → snippet object(s)
    byLanguage: new Map(), // language → array of snippet objects
  },
};

// example route
app.get("/api", (req, res) => {
  res.send("API is running");
});

app.get("/api/languages", async (req, res) => {
  try {
    if (Date.now() - cache.languages.retrieveTime < cacheTimeout) {
      return res.json(cache.languages.languages);
    }

    const languages = await Language.find({});
    cache.languages.retrieveTime = Date.now();
    cache.languages.languages = languages;

    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving languages" });
  }
});

app.get("/api/languages/:snippet", async (req, res) => {
  try {
    if (Date.now() - cache.snippets.retrieveTime < cacheTimeout) {
      const languageSet = new Set();

      for (const snippet of cache.snippets.snippets) {
        if (snippet.title === req.params.snippet) {
          languageSet.add(snippet.language);
        }
      }

      return res.json([...languageSet]);
    }

    const snippets = await Snippet.find({ title: req.params.snippet });
    cache.snippets.retrieveTime = Date.now();
    cache.snippets.snippets = snippets;

    const languages = [...new Set(snippets.map((s) => s.language))];
    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving languages for snippet" });
  }
});

app.get("/api/snippets", async (req, res) => {
  try {
    if (Date.now() - cache.snippets.retrieveTime < cacheTimeout) {
      return res.json(cache.snippets.snippets);
    }

    const snippets = await Snippet.find({});
    cache.snippets.retrieveTime = Date.now();
    cache.snippets.snippets = snippets;

    // Populate maps
    cache.snippets.byTitle = new Map();
    cache.snippets.byLanguage = new Map();

    for (const snip of snippets) {
      // By title
      if (!cache.snippets.byTitle.has(snip.title)) {
        cache.snippets.byTitle.set(snip.title, []);
      }
      cache.snippets.byTitle.get(snip.title).push(snip);

      // By language
      if (!cache.snippets.byLanguage.has(snip.language)) {
        cache.snippets.byLanguage.set(snip.language, []);
      }
      cache.snippets.byLanguage.get(snip.language).push(snip);
    }

    res.json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving snippets" });
  }
});

app.get("/api/snippets/:language", async (req, res) => {
  try {
    const language = req.params.language;

    // If we have cached snippets for this language
    if (
      cache.snippets.byLanguage.has(language) &&
      Date.now() - cache.snippets.retrieveTime < cacheTimeout
    ) {
      return res.json(cache.snippets.byLanguage.get(language));
    }

    // Fetch only for this language from DB
    const newSnippets = await Snippet.find({ language });

    // Update general snippets cache
    for (const snip of newSnippets) {
      if (!cache.snippets.snippets.find((s) => s._id.equals(snip._id))) {
        cache.snippets.snippets.push(snip);
      }
    }

    // Update per-language map
    cache.snippets.byLanguage.set(language, newSnippets);
    cache.snippets.retrieveTime = Date.now();

    res.json(newSnippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving snippets by language" });
  }
});

export default app;
