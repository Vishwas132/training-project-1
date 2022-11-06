import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRoute = Router();

userRoute.get("/:name", userController.getUser);


userRoute.post("/", userController.createUser);

export default userRoute;
