import client from "../models/database.js";
import { createToken, verifyToken } from "../middleware/utils.js";

const createNewUser = async (req) => {
  try {
    const { name, email, active, phone_no, address } = req.body;
    const userId = await (
      await client.query(
        `insert into movies.user (name, active, email) values ('${name}', ${active}, '${email}') returning id;`
      )
    ).rows[0].id;
    await client.query(
      `insert into movies.user_contact (user_id, phone_no, address) values (${userId}, ${phone_no}, '${address}');`
    );

    const token = createToken({ email });
    const expiresIn = verifyToken(token).exp;

    await client.query(
      `insert into movies.user_session (user_id, token, expires_in) values (${userId}, '${token}', ${expiresIn});`
    );
    return token;
  } catch (error) {
    throw error;
  }
};

export default createNewUser;
