import client from "../models/database.js";

const deleteUserById = async (email) => {
  try {
    return await (
      await client.query(
        `delete from movies.user where email = '${email}' returning name;`
      )
    ).rows[0].name;
  } catch (error) {
    throw error;
  }
};

export default deleteUserById;
