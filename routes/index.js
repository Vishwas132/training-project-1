import { Router } from "express";
import userRoute from "./userRoute.js";

const route = Router();

route.get("/", (req, res) => {
  res.send("Success");
});

route.use("/user", userRoute);

export default route;
