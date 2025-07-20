import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/auth.js";

import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import tripRoutes from "./routes/tripCreation.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trip", tripRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
