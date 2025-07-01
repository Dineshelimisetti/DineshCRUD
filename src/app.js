import express from "express";
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("API is working");
});

export default app;
