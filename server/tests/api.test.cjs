const request = require("supertest");
const app = require("../app.js");

describe("GET /api", () => {
  it("returns API is running", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("API is running");
  });
});
