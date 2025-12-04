import { spawn } from "child_process";
import axios from "axios";
import { PORT_NUMBER } from "./index.js";

const TIMEOUT_MS = 5000;

const proc = spawn("npm", ["run", "server-dev"], {
  stdio: ["inherit", "pipe", "inherit"],
});

let started = false;

proc.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text); // still show output live

  if (text.includes("starting")) {
    started = true;
    testAPIOn()
      .then(testEndpointLanguages)
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });

    proc.kill();
    process.exit(0);
  }
});

proc.on("close", (code) => {
  if (!started) process.exit(1);
});

setTimeout(() => {
  if (!started) {
    proc.kill();
    process.exit(1);
  }
}, TIMEOUT_MS);

async function testAPIOn() {
  const response = await axios.get(`http://localhost:${PORT_NUMBER}/api`);
  expect(response.status).toBe(200);
  expect(response.data).toBe("API is running");
  return true;
}

async function testEndpointLanguages() {
  const response = await axios.get(
    `http://localhost:${PORT_NUMBER}/api/languages`,
  );
  expect(response.status).toBe(200);
  expect(response.data.languages.length).toBeGreaterThan(0);
  return true;
}
