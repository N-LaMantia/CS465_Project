import { spawn } from "child_process";
import axios from "axios";
import { PORT_NUMBER } from "./index.js";
import assert from "node:assert";

const TIMEOUT_MS = 1500;

const proc = spawn("npm", ["run", "server-dev"], {
  stdio: ["inherit", "pipe", "inherit"],
});

let started = false;

const timeout = setTimeout(() => {
  if (!started) {
    proc.kill();
    process.exit(1);
  }
}, TIMEOUT_MS);

proc.stdout.on("data", (data) => {
  clearTimeout(timeout);
  const text = data.toString();
  process.stdout.write(text); // still show output live

  if (text.includes("starting")) {
    started = true;
    waitForServer()
      .then(testAPIOn)
      .then(testEndpointLanguages)
      .then(testEndpointSnippets)
      .then(testEndpointLanguagesFromSnippet)
      .then(testEndpointSnippetFromLanguage)
      .then(() => {
        setTimeout(() => {
          proc.kill("SIGTERM");
        }, 200); // allow stdout to flush
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }
});

proc.on("close", (code) => {
  if (!started) process.exit(1);
  process.exit(0);
});

async function waitForServer() {
  for (let i = 0; i < 20; i++) {
    try {
      await axios.get(`http://localhost:${PORT_NUMBER}/api`);
      return; // server is actually ready
    } catch {
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  throw new Error("Server did not respond in time");
}

async function testAPIOn() {
  console.log("testAPIOn");
  const response = await axios.get(`http://localhost:${PORT_NUMBER}/api`);
  assert.equal(response.status, 200);
  assert.equal(response.data, "API is running");
  return true;
}

async function testEndpointLanguages() {
  console.log("testEndpointLanguages");
  const response = await axios.get(
    `http://localhost:${PORT_NUMBER}/api/languages`,
  );
  assert.equal(response.status, 200);
  assert(response.data.length > 0);
  return true;
}

async function testEndpointSnippets() {
  console.log("testEndpointSnippets");
  const response = await axios.get(
    `http://localhost:${PORT_NUMBER}/api/snippets`,
  );
  assert.equal(response.status, 200);
  assert(response.data.length > 0);
  return true;
}

async function testEndpointSnippetFromLanguage() {
  console.log("testEndpointSnippetFromLanguage");
  const response = await axios.get(
    `http://localhost:${PORT_NUMBER}/api/snippets/JavaScript`,
  );
  assert.equal(response.status, 200);
  assert(response.data.length > 0);
  return true;
}

async function testEndpointLanguagesFromSnippet() {
  console.log("testEndpointLanguagesFromSnippet");
  const response = await axios.get(
    `http://localhost:${PORT_NUMBER}/api/languages/Switch%2fMatch`,
  );
  assert.equal(response.status, 200);
  assert(response.data.length > 0);
  return true;
}
