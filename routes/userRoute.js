import { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as userAddressController from "../controllers/userAddressController.js";
import getAddress from "../controllers/userAddressController.js";
import sessionAuthenticate from "../middleware/middleware.js";

const userRoute = Router();

userRoute.get("/", sessionAuthenticate, userController.getUser);

userRoute.get("/", sessionAuthenticate, getAddress);

userRoute.get(
  "/address/",
  sessionAuthenticate,
  userAddressController.getUserAddress
);

userRoute.post("/signup", userController.createUser);

userRoute.put("/signin", userController.signIn);

userRoute.put("/signout", userController.signOut);

userRoute.delete("/delete", sessionAuthenticate, userController.deleteUser);

export default userRoute;
