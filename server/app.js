/**
 * This file contains all endpoint routes for the API.
 *
 * @file
 * @author Thomas Gallaher
 * Contributors:
 *
 * Contents:
 *  Routes
 *    - /api - Route to test if API is running
 *    - /api/languages - Route to get all languages
 *    - /api/snippets - Route to get all snippets
 *    - /api/languages/:snippet - Route to get languages available for a specific snippet
 *    - /api/snippets/:language - Route to get snippets available for a specific language
 */
import express from "express";
import cors from "cors";

import Language from "./models/Language.js";
import Snippet from "./models/Snippet.js";
import User from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cors());

// Cache
const cacheTimeout = 60 * 60 * 1000;

let cache = {
  languages: {
    retrieveTime: 0,
    languages: [],
  },
  snippets: {
    retrieveTime: 0,
    snippets: [], // full list of fetched snippets
    byTitle: new Map(), // map of snippets by title
    byLanguage: new Map(), // map of snippets by language
  },
};

// Routes

/**
 * Route to test if API is running
 */
app.get("/api", (req, res) => {
  res.send("API is running");
});

app.get("api/routes", (req, res) => {
  res.send({
    Routes: [
      "/api",
      "/api/languages",
      "/api/snippets",
      "/api/languages/:snippet",
      "/api/snippets/:language",
      "/api/tags",
      "/api/tags/:language",
    ],
  });
});

/**
 * Route to get all languages
 *
 * @function
 * @author Thomas Gallaher
 *
 * @returns {Object} - JSON object containing all languages
 */
app.get("/api/languages", async (req, res) => {
  try {
    if (Date.now() - cache.languages.retrieveTime < cacheTimeout) {
      // Check if languages are in cache and return
      return res.json(cache.languages.languages);
    }

    // If languages are not in cache, fetch them
    const languages = await Language.find({});
    cache.languages.retrieveTime = Date.now();
    cache.languages.languages = languages;

    // Return languages
    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving languages" });
  }
});

/**
 * Route to get languages available for a specific snippet
 *
 * @function
 * @author Thomas Gallaher
 *
 * @param {string} snippet - The title of the snippet
 *
 * @returns {Object} - JSON object containing all languages available for the snippet
 */
app.get("/api/languages/:snippet", async (req, res) => {
  try {
    if (Date.now() - cache.snippets.retrieveTime < cacheTimeout) {
      // Check if snippet is in cache
      const languageSet = new Set();

      for (const snippet of cache.snippets.snippets) {
        if (snippet.title === req.params.snippet) {
          languageSet.add(snippet.language);
        }
      }

      // If snippet is in cache return the set
      return res.json([...languageSet]);
    }

    // If snippet is not in cache, fetch it
    const snippets = await Snippet.find({ title: req.params.snippet });

    // Update cache
    cache.snippets.retrieveTime = Date.now();
    cache.snippets.snippets = snippets;

    // Get languages
    const languages = [...new Set(snippets.map((s) => s.language))];

    // Return language list
    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving languages for snippet" });
  }
});

/**
 * Route to get all snippets
 *
 * @function
 * @author Thomas Gallaher
 *
 * @returns {Object} - JSON object containing all snippets
 */
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

/**
 * Route to get snippets available for a specific language
 *
 * @function
 * @author Thomas Gallaher
 *
 * @param {string} language - The language
 *
 * @returns {Object} - JSON object containing all snippets available for the language
 */
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

app.get("/api/tags", async (req, res) => {
  try {
    const snippets = await Snippet.find({});
    const tags = [...new Set(snippets.flatMap((s) => s.tags))];
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving tags" });
  }
});

app.get("/api/tags/:language", async (req, res) => {
  try {
    const snippets = await Snippet.find({ language: req.params.language });
    const tags = [...new Set(snippets.flatMap((s) => s.tags))];
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving tags" });
  }
});

app.get("api/snippets/:language/:tag", async (req, res) => {
  try {
    const snippets = await Snippet.find({
      language: req.params.language,
      tags: req.params.tag,
    });
    res.json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving snippets by tag" });
  }
});

export default app;
