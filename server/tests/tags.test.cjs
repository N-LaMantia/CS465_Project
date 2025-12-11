/**
 * This file contains the test for the /api/tags/* endpoints
 *
 * @file
 * @author Thomas Gallaher
 * Contributors:
 */
const request = require("supertest");
const app = require("../app.cjs");
const Snippet = require("../models/Snippet.js");

/**
  * Tests if the /api/tags endpoint is working by creating a 
  *  snippet with a set of tags and checking if it is returned
  *  when getting tags for a specific language
  *
  * @function
  * @author Thomas Gallaher
  * Contributors:
  */
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

/**
  * Tests if the /api/tags endpoint is working by creating a 
  *  snippet with a set of tags and checking if it is returned
  *  when getting all tags
  *
  * @function
  * @author Thomas Gallaher
  * Contributors:
  */
describe("GET /api/tags", () => {
  it("returns all tags", async () => {
    await Snippet.create({
      title: "If Statement",
      description: "Conditional logic",
      tags: ["conditionals", "basics"],
      language: "JavaScript",
      rendered: "<p>example</p>",
      code: "if (x) {}",
      compatibleVersions: ["ES6"],
    });

    const res = await request(app).get("/api/tags");

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("conditionals");
    expect(res.body).toContain("basics");
  });
});

/**
  * Tests if the /api/tags endpoint is working by creating a 
  *  snippet with a set of tags and checking if it is returned
  *  when getting snippets for a specific tag
  *
  * @function
  * @author Thomas Gallaher
  * Contributors:
  */
describe("GET /api/tags/snippets/:tag", () => {
  it("returns snippets for a specific tag", async () => {
    // Insert snippet
    await Snippet.create({
      title: "If Statement",
      description: "Conditional logic",
      tags: ["conditionals", "basics"],
      language: "JavaScript",
      rendered: "<p>example</p>",
      code: "if (x) {}",
      compatibleVersions: ["ES6"],
    });

    // Fetch by tag
    const res = await request(app).get("/api/tags/snippets/conditionals");


    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("If Statement");
  });
});

/**
  * Tests if the /api/tags endpoint is working by creating a few
  *  snippets with a set of tags and checking if they are returned
  *  proprerly when getting filtered tags for a specific language 
  *  and tag.
  *  
  * @function
  * @author Thomas Gallaher
  * Contributors:
  */
describe("GET /api/tags/:languages/:tags", () => {
  it("returns filtered tags for given languages and tags", async () => {
    // Seed snippets
    await Snippet.create([
      {
        title: "Snippet1",
        language: "JavaScript",
        tags: ["loops", "functions"],
        code: "console.log('hi')",
        rendered: "<p>hi</p>",
        compatibleVersions: ["ES6"],
        description: "Example snippet",
      },
      {
        title: "Snippet2",
        language: "Python",
        tags: ["loops", "conditionals"],
        code: "print('hi')",
        rendered: "<p>hi</p>",
        compatibleVersions: ["3.10"],
        description: "Example snippet",
      },
    ]);

    const res = await request(app).get("/api/tags/JavaScript/loops");

    expect(res.statusCode).toBe(200);
    // The endpoint should exclude the tag 'loops' from the response
    expect(res.body.filteredTags).toEqual(["functions"]);
  });

  it("returns all tags if 'all' is used", async () => {
    await Snippet.create([
      {
        title: "Snippet1",
        language: "JavaScript",
        tags: ["loops", "functions"],
        code: "console.log('hi')",
        rendered: "<p>hi</p>",
        compatibleVersions: ["ES6"],
        description: "Example snippet",
      },
      {
        title: "Snippet2",
        language: "Python",
        tags: ["loops", "conditionals"],
        code: "print('hi')",
        rendered: "<p>hi</p>",
        compatibleVersions: ["3.10"],
        description: "Example snippet",
      },
    ]);

    const res = await request(app).get("/api/tags/all/all");

    expect(res.statusCode).toBe(200);
    expect(res.body.filteredTags).toEqual(expect.arrayContaining(["loops", "functions", "conditionals"]));
  });
});
