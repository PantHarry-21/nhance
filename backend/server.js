import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Base route
app.get("/", (req, res) => {
  res.send("NHance backend is running 🚀");
});
// Enable CORS
app.use(cors({ origin: 'http://localhost:5173' }));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
