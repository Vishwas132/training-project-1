import { Router } from "express";
import * as userController from "../controllers/userController.js";
import getAddress from "../controllers/userAddressController.js";
import sessionAuthenticate from "../middleware/middleware.js";

const userRoute = Router();

userRoute.get("/", sessionAuthenticate, userController.getUser);

userRoute.get("/address", sessionAuthenticate, getAddress);

userRoute.post("/signup", userController.createUser);

userRoute.put("/signin", userController.signIn);

userRoute.put("/signout", userController.signOut);

userRoute.delete("/delete", sessionAuthenticate, userController.deleteUser);

export default userRoute;
