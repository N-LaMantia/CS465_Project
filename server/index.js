import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

// Connect to MongoDB database with uri from .env
mongoose
  .connect(process.env.MONGO_URI, {
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
