import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.send("Success");
});

export default route;
