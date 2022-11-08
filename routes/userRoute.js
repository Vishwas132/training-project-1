import { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as userAddressController from "../controllers/userAddressController.js";

const userRoute = Router();

userRoute.get("/:name", userController.getUser);

userRoute.get("/address/:name", userAddressController.getUserAddress);

userRoute.post("/", userController.createUser);

userRoute.delete("/:name", userController.deleteUser);

export default userRoute;
