import fs from "fs";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import log from "npmlog";

xhv9V510KwLXTtBX;

const fileStream = fs.createWriteStream("app.log", { flags: "a" });

log.stream = fileStream;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(morgan("dev"));

app.get("/api/topics", (req, res) => {
  try {
    const data = fs.readFileSync("./api/topics.json", "utf8");
    const jsonData = JSON.parse(data);
    res.status(200);
    res.json(jsonData);
    log.info("server", "Topics read successfully");
  } catch (parseErr) {
    log.error("server", "Error parsing JSON: " + parseErr);
    res.status(500).send("Invalid JSON format");
  }
});

app.get("/api/quizes/:topic", (req, res) => {
  try {
    const topicIndex = {
      history: "history_quizes.json",
      lotr: "lotr_quizes.json",
    };
    const topic = topicIndex[req.params.topic];
    const data = fs.readFileSync(`./api/${topic}`, "utf8");
    const jsonData = JSON.parse(data);
    res.status(200);
    res.json(jsonData);
    log.info("server", "Quizes read successfully");
  } catch (e) {
    log.error("server", "Error reading quizes: " + e);
    res.status(500).send("Error reading quizes");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
