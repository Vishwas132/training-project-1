import { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as userAddressController from "../controllers/userAddressController.js";
import sessionAuthenticate from "../middleware/middleware.js";

const userRoute = Router();

userRoute.get("/", sessionAuthenticate, userController.getUser);

userRoute.get(
  "/address/",
  sessionAuthenticate,
  userAddressController.getUserAddress
);

userRoute.post("/signup", userController.createUser);

userRoute.put("/signin", userController.signInUser);

userRoute.put("/signout", userController.signOutUser);

userRoute.delete("/delete", sessionAuthenticate, userController.deleteUser);

export default userRoute;
