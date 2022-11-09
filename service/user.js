import client from "../models/database.js";

const getUserById = async (email) => {
  try {
    return await client.query(
      `select name, email, active from movies.user where email = '${email}';`
    );
  } catch (error) {
    console.log("error", error);
    throw {
      error: "Db error while executing query",
    };
  }
};

export default getUserById;
