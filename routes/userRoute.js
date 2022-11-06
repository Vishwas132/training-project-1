import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRoute = Router();

userRoute.get("/:name", userController.getUser);

export default userRoute;
