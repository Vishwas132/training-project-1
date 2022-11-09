import client from "../models/database.js";
import { createToken, verifyToken, getToken } from "../middleware/utils.js";

const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userObj = await client.query(
      `select name, email, active from movies.user where email = '${email}';`
    );
    return res.status(200).json({
      user: userObj.rows[0],
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

const createUser = async (req, res) => {
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
    console.log("token=", token);
    await client.query(
      `insert into movies.user_session (user_id, token) values (${userId}, '${token}');`
    );
    res.status(200).json({ token });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const name = await (
      await client.query(
        `delete from movies.user where email = '${email}' returning name;`
      )
    ).rows[0].name;
    return res.status(200).json(`User ${name} with email ${email} deleted`);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email } = req.body;
    let token = getToken(req);

    const userId = await (
      await client.query(`select id from movies.user where email = '${email}';`)
    ).rows[0].id;

    const dbToken = await (
      await client.query(
        `select token from movies.user_session where user_id = ${userId};`
      )
    ).rows[0].token;

    if (dbToken === null) {
      token = createToken({ email });
      await client.query(
        `update movies.user_session set token = '${token}' where user_id = '${userId}';`
      );
    }
    const payload = verifyToken(token);

    if (payload.exp) {
      if (dbToken == null || Date.now() > payload.exp * 1000) {
      }
    }

    return res.status(200).json({ token });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      error,
    });
  }
};

const signOutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = await (
      await client.query(`select id from movies.user where email = '${email}';`)
    ).rows[0].id;
    await client.query(
      `update movies.user_session set token = null where user_id = ${userId};`
    );
    return res.status(200).json(`User signed out`);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export { getUser, createUser, signInUser, deleteUser, signOutUser };
