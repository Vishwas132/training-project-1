import express from "express";
import route from "./routes/index.js";

const app = express();
let port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

app.listen(port, () => {
  console.log(`Server listning on at http://localhost:${port}`);
});
