import { getToken, verifyToken } from "./utils.js";
import getUserById from "../service/getUser.js";

const sessionAuthenticate = async (req, res, next) => {
  try {
    const token = getToken(req);
    const data = verifyToken(token);
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
