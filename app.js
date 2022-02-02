import express from "express";
import cors from "cors";
import pool from "./db.js";

// config
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json("Everithing is working ok");
});

//start up
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is operational on port: ${port}`);
});
