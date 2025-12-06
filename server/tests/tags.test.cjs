const request = require("supertest");
const app = require("../app.js");
const Snippet = require("../models/Snippet.js");

describe("GET /api/tags/:language", () => {
  it("returns tags for a given language", async () => {
    await Snippet.create({
      title: "If Statement",
      description: "Conditional logic",
      tags: ["conditionals", "basics"],
      language: "JavaScript",
      rendered: "<p>example</p>",
      code: "if (x) {}",
      compatibleVersions: ["ES6"],
    });

    const res = await request(app).get("/api/tags/JavaScript");

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("conditionals");
    expect(res.body).toContain("basics");
  });
});
