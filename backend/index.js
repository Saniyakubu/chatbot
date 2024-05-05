import "dotenv/config";
import express from "express";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import router from "./routes/router.js";
const app = express();
const PORT = process.env.PORT || 5000;
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const __dirname = path.resolve();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatlink-2g7p.onrender.com",
      "http://localhost:2000",
      "https://chatlink-2g7p.onrender.com/",
    ],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/ask", router);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
