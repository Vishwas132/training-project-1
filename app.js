import express from "express";

const app = express();
let port = 3000;

app.get("/", (req, res) => {
  res.send("Success");
});

app.listen(port, () => {
  console.log(`Server listning on at http://localhost:${port}`);
});
