import client from "../models/database.js";
import { getToken, createToken, verifyToken } from "../middleware/utils.js";

const signInUser = async (req) => {
  // Check if token in database is null; if yes then create new token update variable dbToken as newly created
  // token and store in database, otherwise do nothing and in the end return dbToken
  try {
    let token = await getToken(req);
    const { email } = req.body;

    const userId = await (
      await client.query(`select id from movies.user where email = '${email}';`)
    ).rows[0].id;

    let dbToken = await (
      await client.query(
        `select token, expires_in from movies.user_session where user_id = ${userId};`
      )
    ).rows[0].token;

    if (dbToken === null) {
      token = await createToken({ email });
      const payload = await verifyToken(token);
      await client.query(
        `update movies.user_session set token = '${token}', expires_in = ${payload.exp} where user_id = '${userId}';`
      );
      dbToken = token;
    }

    // if (expiresIn) {
    //   if (Date.now() > expiresIn * 1000) {
    //     token = createToken({ email });
    //     await client.query(
    //       `update movies.user_session set token = '${token}' where user_id = '${userId}';`
    //     );
    //   }
    // }
    return dbToken;
  } catch (error) {
    console.log("error", error);
    return { error };
  }
};

export default signInUser;
