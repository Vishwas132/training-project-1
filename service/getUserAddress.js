import client from "../models/database.js";

const getUserAddress = async (email) => {
  try {
    const userId = await client.query(
      `select id from movies.user where email = '${email}';`
    );
    const address = await client.query(
      `select address from movies.user_contact where user_id = '${userId.rows[0].id}';`
    );
    return address.rows[0].address;
  } catch (error) {}
};

export default getUserAddress;
