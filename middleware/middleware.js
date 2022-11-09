import { getToken, verifyToken } from "./utils.js";
import getUserById from "../service/user.js";

const sessionAuthenticate = async (req, res, next) => {
  try {
    const token = getToken(req);
    console.log("token", token);
    const data = verifyToken(token);
    console.log("data", data.exp * 1000);
    console.log("Date.now()", Date.now());
    if (data && data.email) {
      const email = await getUserById(data.email);
      if (email.rows[0].email) {
        next();
      } else {
        throw {
          error: "email not registered",
        };
      }
    } else {
      throw {
        error: "Unable to verify token",
      };
    }
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ error: error });
  }
};

export default sessionAuthenticate;
