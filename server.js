import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analyzeRoute);

app.get("/", (req, res) => {
  res.send("AISA Agent is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("✅ Server started successfully");
  console.log(`🌐 http://localhost:${PORT}`);
});
