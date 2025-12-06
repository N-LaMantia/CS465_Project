const request = require("supertest");
const app = require("../app.js");
const Snippet = require("../models/Snippet.js");
const Language = require("../models/Language.js");

describe("GET /api/languages", () => {
  it("returns all languages", async () => {
    await Language.create({
      title: "JavaScript",
      description: "Popular front-end and back-end language",
      languageType: "OOP",
    });

    const res = await request(app).get("/api/languages");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("JavaScript");
  });
});

describe("GET /api/languages/:snippet", () => {
  it("returns languages for a snippet title", async () => {
    await Snippet.create([
      {
        title: "Switch/Match",
        description: "JS version",
        tags: ["control-flow"],
        language: "JavaScript",
        rendered: "<p>example</p>",
        code: "switch (x) { case 1: break; }",
        compatibleVersions: ["ES6"],
      },
      {
        title: "Switch/Match",
        description: "Python version",
        tags: ["control-flow"],
        language: "Python",
        rendered: "<p>example</p>",
        code: "match x: case 1: pass",
        compatibleVersions: ["3.10"],
      },
    ]);

    const res = await request(app).get("/api/languages/Switch%2FMatch");

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("JavaScript");
    expect(res.body).toContain("Python");
  });
});
