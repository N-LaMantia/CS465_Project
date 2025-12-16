const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app.cjs");

dotenv.config();
const uri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;

// Connect to MongoDB database with uri from .env
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    dbName: "cs465",
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
const PORT_NUMBER = process.env.PORT || 8000;
app.listen(PORT_NUMBER, () =>
  console.log(`Server running on port ${PORT_NUMBER}`),
);
module.exports = PORT_NUMBER;
