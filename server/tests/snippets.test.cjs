const request = require("supertest");
const app = require("../app.cjs");
const Snippet = require("../models/Snippet.js");

describe("GET /api/snippets", () => {
  it("returns all snippets", async () => {
    await Snippet.create({
      title: "Switch/Match",
      description: "A switch-like structure",
      tags: ["control-flow"],
      language: "JavaScript",
      rendered: "<p>example</p>",
      code: "switch (x) { case 1: break; }",
      compatibleVersions: ["ES6"],
    });

    const res = await request(app).get("/api/snippets");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].language).toBe("JavaScript");
  });
});

describe("GET /api/snippets/:language", () => {
  it("returns snippets for a specific language", async () => {
    await Snippet.create({
      title: "Loop",
      description: "A simple loop",
      tags: ["iteration"],
      language: "Python",
      rendered: "<p>example</p>",
      code: "for i in range(5): print(i)",
      compatibleVersions: ["3.10"],
    });

    const res = await request(app).get("/api/snippets/Python");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Loop");
  });
});
