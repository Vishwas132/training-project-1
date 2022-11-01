import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Success");
});

app.listen(port, (req, res) => {
  console.log(`Server listning on at http://localhost:${port}`);
});
