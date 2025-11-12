import { spawn } from "child_process";

const TIMEOUT_MS = 5000; // how long to wait before failing
const proc = spawn("npx", ["nodemon", "--verbose", "server/index.js"]);

let started = false;

proc.stdout.on("data", (data) => {
  const text = data.toString();
  console.log(text);

  // Nodemon prints "starting" when it actually launches Node
  if (text.includes("starting")) {
    started = true;
    proc.kill();
    process.exit(0);
  }
});

setTimeout(() => {
  if (!started) {
    proc.kill();
    process.exit(1);
  }
}, TIMEOUT_MS);
