import { spawn } from "child_process";

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
