/**
 * This file contains the test for the /api endpoint
 *
 * @file
 * @author Thomas Gallaher
 * Contributors:
 */
const request = require("supertest");
const app = require("../app.cjs");

/**
 * Tests if the /api endpoint is working
 *
 * @function
 * @author Thomas Gallaher
 * Contributors:
 */
describe("GET /api", () => {
  it("returns API is running", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("API is running");
  });
});
