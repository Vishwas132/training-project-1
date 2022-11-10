import client from "../models/database.js";

const signOutUser = async (email) => {
  try {
    const { id, name } = await (
      await client.query(
        `select id, name from movies.user where email = '${email}';`
      )
    ).rows[0];
    await client.query(
      `update movies.user_session set token = null, expires_in = null where user_id = ${id};`
    );
    return name;
  } catch (error) {
    throw { error: "Error while qurying database" };
  }
};

export default signOutUser;
