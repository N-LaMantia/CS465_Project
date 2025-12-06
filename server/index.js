const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app.js");

dotenv.config();
const uri = process.env.MONGODB_URI_TEST || process.env.MONGODB_URI;

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
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export const PORT_NUMBER = PORT;
